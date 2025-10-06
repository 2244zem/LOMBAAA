import { api } from './api';

const ZHIPUAI_API_KEY = process.env.REACT_APP_ZHIPUAI_API_KEY;
const MAX_REQUESTS = parseInt(process.env.REACT_APP_ZHIPUAI_MAX_REQUESTS) || 50;
const DAILY_LIMIT = parseInt(process.env.REACT_APP_ZHIPUAI_DAILY_LIMIT) || 100;

class ZhipuAIService {
  constructor() {
    this.requestCount = 0;
    this.dailyCount = 0;
    this.lastResetDate = new Date().toDateString();
    this.systemPrompt = `Anda adalah asisten AI khusus untuk topik sampah dan daur ulang. 
    Hanya jawab pertanyaan terkait:
    - Pengelolaan sampah
    - Daur ulang material
    - Pemilahan sampah
    - Kompos dan pengolahan organik
    - Limbah dan lingkungan
    - Teknologi pengolahan sampah
    - Ekonomi sirkular
    
    Tolak menjawab pertanyaan di luar topik tersebut.`;
  }

  // Cek dan reset limit harian
  checkDailyLimit() {
    const today = new Date().toDateString();
    if (today !== this.lastResetDate) {
      this.dailyCount = 0;
      this.lastResetDate = today;
    }
  }

  // Cek apakah request masih dalam limit
  canMakeRequest() {
    this.checkDailyLimit();
    return this.requestCount < MAX_REQUESTS && this.dailyCount < DAILY_LIMIT;
  }

  // Get remaining requests
  getRemainingRequests() {
    return {
      session: MAX_REQUESTS - this.requestCount,
      daily: DAILY_LIMIT - this.dailyCount
    };
  }

  // Main function untuk chat dengan Zhipu AI
  async chatWithAI(message) {
    if (!this.canMakeRequest()) {
      throw new Error(`Limit AI tercapai. Sisa: ${this.getRemainingRequests().session} sesi, ${this.getRemainingRequests().daily} harian`);
    }

    if (!this.isWasteRelated(message)) {
      throw new Error('Maaf, saya hanya bisa menjawab pertanyaan seputar sampah dan daur ulang');
    }

    try {
      this.requestCount++;
      this.dailyCount++;

      const response = await fetch('https://open.bigmodel.cn/api/paas/v4/chat/completions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${ZHIPUAI_API_KEY}`
        },
        body: JSON.stringify({
          model: "glm-4",
          messages: [
            {
              role: "system",
              content: this.systemPrompt
            },
            {
              role: "user",
              content: message
            }
          ],
          max_tokens: 500,
          temperature: 0.7
        })
      });

      if (!response.ok) {
        throw new Error(`API Error: ${response.status}`);
      }

      const data = await response.json();
      return {
        success: true,
        message: data.choices[0].message.content,
        remaining: this.getRemainingRequests()
      };

    } catch (error) {
      this.requestCount--; // Rollback jika error
      this.dailyCount--;
      throw error;
    }
  }

  // Filter untuk memastikan hanya topik sampah/daur ulang
  isWasteRelated(message) {
    const wasteKeywords = [
      'sampah', 'daur ulang', 'limbah', 'plastik', 'organik', 'anorganik',
      'kompos', 'bank sampah', 'tpa', 'tpst', 'pemilahan', 'recycle',
      'environment', 'lingkungan', 'polusi', 'limbah', 'botol', 'kertas',
      'kaleng', 'besi', 'kaca', 'mendaur ulang', 'eco', 'green',
      'sustainability', 'berkelanjutan', 'zero waste', 'compost'
    ];

    const lowerMessage = message.toLowerCase();
    return wasteKeywords.some(keyword => lowerMessage.includes(keyword));
  }

  // Reset counter (untuk testing/admin)
  resetCounters() {
    this.requestCount = 0;
    this.dailyCount = 0;
    this.lastResetDate = new Date().toDateString();
  }
}

export const zhipuAiService = new ZhipuAIService();