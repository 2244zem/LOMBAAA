// src/features/aiAssistant/index.jsx
import React, { useState, useRef, useEffect } from 'react';

const AIAssistant = () => {
  const [messages, setMessages] = useState([
    {
      id: 1,
      text: "Halo! Saya AI Assistant khusus sampah dan daur ulang. Saya bisa membantu Anda dengan informasi tentang pemilahan sampah, daur ulang, pengomposan, dan tips lingkungan lainnya. Apa yang bisa saya bantu hari ini? 🌱",
      sender: 'ai',
      timestamp: new Date()
    }
  ]);
  const [inputMessage, setInputMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (!inputMessage.trim()) return;

    const userMessage = {
      id: Date.now(),
      text: inputMessage,
      sender: 'user',
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputMessage('');
    setIsLoading(true);

    // Simulate AI response
    setTimeout(() => {
      const aiResponse = {
        id: Date.now() + 1,
        text: getAIResponse(inputMessage),
        sender: 'ai',
        timestamp: new Date()
      };
      setMessages(prev => [...prev, aiResponse]);
      setIsLoading(false);
    }, 2000);
  };

  const getAIResponse = (message) => {
    const lowerMessage = message.toLowerCase();
    
    if (lowerMessage.includes('pilah') || lowerMessage.includes('kategori') || lowerMessage.includes('jenis')) {
      return "**📋 Panduan Pemilahan Sampah:**\n\n• 🍂 **ORGANIK**: Sisa makanan, daun, kayu, ranting (bisa dikompos)\n• 🫙 **ANORGANIK**: Plastik, kaca, logam, kertas (bisa didaur ulang)\n• ⚠️ **B3 (Berbahaya)**: Baterai, elektronik, obat, lampu (butuh penanganan khusus)\n• 🗑️ **RESIDU**: Popok, pembalut, kemasan kotor (ditimbun di TPA)\n\n💡 **Tips**: Pisahkan sampah basah dan kering untuk memudahkan pengolahan!";
    }
    
    if (lowerMessage.includes('daur ulang') || lowerMessage.includes('recycle') || lowerMessage.includes('plastik')) {
      return "**♻️ Panduan Daur Ulang:**\n\n• **Plastik**: Cuci bersih, keringkan, pisahkan berdasarkan jenis (PET, HDPE, PP)\n• **Kertas**: Pisahkan dari sampah basah, kumpulkan terpisah menurut jenisnya\n• **Kaleng & Logam**: Bersihkan dan gepengkan untuk menghemat space\n• **Kaca**: Hati-hati dalam penanganan, pisahkan berdasarkan warna\n• **Elektronik**: Bawa ke drop point khusus e-waste\n\n🌍 **Ingat**: Reduce dan Reuse lebih baik daripada Recycle!";
    }
    
    if (lowerMessage.includes('kompos') || lowerMessage.includes('organik') || lowerMessage.includes('sisa makanan')) {
      return "**🍂 Cara Membuat Kompos Sederhana:**\n\n1. **Siapkan wadah** komposter atau lubang biopori\n2. **Campur sampah**: \n   - Hijau (sisa sayur, buah)  \n   - Coklat (daun kering, serbuk gergaji)\n3. **Perbandingan** 2:1 (hijau:coklat)\n4. **Tambahkan** activator atau tanah\n5. **Aduk** secara rutin setiap 3-5 hari\n6. **Dalam 2-4 minggu**, kompos siap digunakan!\n\n❌ **Hindari**: Daging, susu, minyak dalam kompos rumah tangga";
    }
    
    if (lowerMessage.includes('tips') || lowerMessage.includes('cara') || lowerMessage.includes('kurangi')) {
      return "**🌱 Tips Ramah Lingkungan:**\n\n• 🛍️ **Bawa tas belanja** sendiri\n• 💧 **Gunakan tumbler** daripada botol plastik\n• 🍱 **Bawa wadah** untuk takeaway\n• 📱 **Donasi barang** yang masih layak pakai\n• 🌿 **Belanja lokal** untuk kurangi emisi transport\n• 🔋 **Pilih produk** isi ulang\n• 🚲 **Transportasi ramah** lingkungan\n\nSetiap tindakan kecil berdampak besar! 💚";
    }

    if (lowerMessage.includes('bank sampah') || lowerMessage.includes('tukar') || lowerMessage.includes('nilai')) {
      return "**🏦 Bank Sampah & Nilai Ekonomi:**\n\n• **Plastik botol**: Rp 2.000-5.000/kg\n• **Kertas koran**: Rp 1.500-3.000/kg  \n• **Kardus**: Rp 2.000-4.000/kg\n• **Kaleng alumunium**: Rp 10.000-15.000/kg\n• **Kaca**: Rp 500-1.500/kg\n• **Elektronik**: Nilai tergantung jenis dan kondisi\n\n💎 **Sampah = Emas** jika dikelola dengan benar!";
    }

    return "**🤖 Terima kasih atas pertanyaannya!**\n\nSebagai AI Assistant khusus lingkungan, saya fokus membantu Anda dengan:\n\n• 📋 **Pemilahan sampah** yang benar\n• ♻️ **Teknik daur ulang** berbagai material  \n• 🍂 **Pengomposan** sampah organik\n• 🌱 **Tips hidup** ramah lingkungan\n• 💰 **Nilai ekonomi** sampah\n• 🏘️ **Pengelolaan sampah** rumah tangga\n\nSilakan tanyakan hal spesifik tentang pengelolaan sampah dan daur ulang! Saya siap membantu 🌟";
  };

  const suggestedQuestions = [
    "Bagaimana cara memilah sampah yang benar?",
    "Apa saja yang bisa didaur ulang?",
    "Cara membuat kompos dari sampah dapur?",
    "Berapa harga sampah plastik di bank sampah?",
    "Tips mengurangi sampah plastik sehari-hari?",
    "Apa perbedaan sampah organik dan anorganik?"
  ];

  const formatTime = (date) => {
    return date.toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-blue-50 to-purple-50">
      {/* Header Section */}
      <div className="bg-green-600 text-white py-12">
        <div className="container mx-auto px-4 text-center">
          <div className="flex justify-center mb-4">
            <div className="bg-white/20 p-4 rounded-2xl backdrop-blur-sm">
              <span className="text-4xl">🤖</span>
            </div>
          </div>
          <h1 className="text-4xl font-bold mb-4">AI Assistant EcoApp</h1>
          <p className="text-xl text-green-100 max-w-2xl mx-auto">
            Dapatkan solusi dan informasi tentang pengelolaan sampah, daur ulang, dan tips ramah lingkungan
          </p>
        </div>
      </div>

      {/* Main Chat Section */}
      <div className="container mx-auto px-4 py-8 -mt-8">
        <div className="bg-white/80 backdrop-blur-lg rounded-2xl shadow-2xl border border-white/20 overflow-hidden">
          {/* Chat Header */}
          <div className="bg-gradient-to-r from-green-500 to-green-600 px-6 py-4">
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-sm">
                <span className="text-2xl text-white">🤖</span>
              </div>
              <div>
                <h3 className="text-white font-bold text-lg">Eco AI Assistant</h3>
                <p className="text-green-100 text-sm">Spesialis Sampah & Daur Ulang</p>
              </div>
              <div className="ml-auto flex items-center space-x-2 bg-white/20 px-3 py-1 rounded-full">
                <div className="w-2 h-2 bg-green-300 rounded-full animate-pulse"></div>
                <span className="text-green-100 text-sm">Online</span>
              </div>
            </div>
          </div>

          {/* Chat Messages Area */}
          <div className="h-96 overflow-y-auto p-6 space-y-4 bg-gradient-to-b from-white to-green-50/30">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-[85%] rounded-2xl p-4 backdrop-blur-sm ${
                    message.sender === 'user'
                      ? 'bg-gradient-to-r from-green-500 to-blue-500 text-white rounded-br-none shadow-lg'
                      : 'bg-white/90 border border-green-100 text-gray-800 rounded-bl-none shadow-md'
                  }`}
                >
                  <div className="whitespace-pre-wrap text-sm leading-relaxed">
                    {message.text.split('**').map((part, index) => 
                      index % 2 === 1 ? (
                        <strong key={index} className={message.sender === 'user' ? 'text-white' : 'text-green-700'}>
                          {part}
                        </strong>
                      ) : (
                        part
                      )
                    )}
                  </div>
                  <div className={`text-xs mt-2 ${
                    message.sender === 'user' ? 'text-white/70' : 'text-gray-500'
                  }`}>
                    {formatTime(message.timestamp)}
                  </div>
                </div>
              </div>
            ))}
            
            {/* Loading Indicator */}
            {isLoading && (
              <div className="flex justify-start">
                <div className="bg-white/90 border border-green-100 rounded-2xl rounded-bl-none p-4 shadow-md backdrop-blur-sm">
                  <div className="flex items-center space-x-2 text-green-600">
                    <span className="text-sm">Eco AI sedang mengetik</span>
                    <div className="flex space-x-1">
                      <div className="w-2 h-2 bg-green-500 rounded-full animate-bounce"></div>
                      <div className="w-2 h-2 bg-green-500 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                      <div className="w-2 h-2 bg-green-500 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                    </div>
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Suggested Questions */}
          <div className="border-t border-green-100 p-4 bg-white/80 backdrop-blur-sm">
            <p className="text-sm text-gray-600 mb-3 font-medium">Pertanyaan cepat:</p>
            <div className="flex flex-wrap gap-2 mb-4">
              {suggestedQuestions.map((question, index) => (
                <button
                  key={index}
                  onClick={() => setInputMessage(question)}
                  className="bg-green-100 hover:bg-green-200 text-green-700 px-3 py-2 rounded-lg text-sm transition-all duration-200 border border-green-200 hover:border-green-300 hover:shadow-sm"
                >
                  {question}
                </button>
              ))}
            </div>

            {/* Input Area */}
            <form onSubmit={handleSendMessage} className="flex space-x-3">
              <div className="flex-1 relative">
                <input
                  type="text"
                  value={inputMessage}
                  onChange={(e) => setInputMessage(e.target.value)}
                  placeholder="Tanya tentang sampah, daur ulang, atau lingkungan..."
                  className="w-full px-4 py-3 border border-green-200 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-all duration-200 bg-white/90 backdrop-blur-sm"
                  disabled={isLoading}
                />
              </div>
              <button
                type="submit"
                disabled={!inputMessage.trim() || isLoading}
                className="bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 disabled:from-gray-400 disabled:to-gray-500 text-white px-6 py-3 rounded-lg font-semibold transition-all duration-200 disabled:cursor-not-allowed shadow-lg hover:shadow-xl flex items-center space-x-2"
              >
                {isLoading ? (
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                ) : (
                  <>
                    <span>📤</span>
                    <span>Kirim</span>
                  </>
                )}
              </button>
            </form>
          </div>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
          <div className="bg-white/80 backdrop-blur-sm rounded-xl p-6 text-center border border-white/20 shadow-lg hover:shadow-xl transition-all duration-300">
            <div className="w-16 h-16 bg-gradient-to-r from-green-500 to-emerald-500 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg">
              <span className="text-2xl text-white">🗑️</span>
            </div>
            <h3 className="font-bold text-gray-800 text-lg mb-2">Pemilahan Sampah</h3>
            <p className="text-gray-600 text-sm">Pelajari cara memilah sampah dengan benar berdasarkan kategori dan jenisnya</p>
          </div>

          <div className="bg-white/80 backdrop-blur-sm rounded-xl p-6 text-center border border-white/20 shadow-lg hover:shadow-xl transition-all duration-300">
            <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg">
              <span className="text-2xl text-white">♻️</span>
            </div>
            <h3 className="font-bold text-gray-800 text-lg mb-2">Daur Ulang</h3>
            <p className="text-gray-600 text-sm">Temukan cara kreatif mendaur ulang berbagai jenis material dengan benar</p>
          </div>

          <div className="bg-white/80 backdrop-blur-sm rounded-xl p-6 text-center border border-white/20 shadow-lg hover:shadow-xl transition-all duration-300">
            <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-pink-500 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg">
              <span className="text-2xl text-white">🌱</span>
            </div>
            <h3 className="font-bold text-gray-800 text-lg mb-2">Eco Tips</h3>
            <p className="text-gray-600 text-sm">Dapatkan tips ramah lingkungan untuk kehidupan sehari-hari yang berkelanjutan</p>
          </div>
        </div>

        {/* Info Section */}
        <div className="bg-gradient-to-r from-green-500 to-green-600 rounded-2xl p-8 text-center mt-8 text-white shadow-2xl">
          <h3 className="text-2xl font-bold mb-4">💡 Butuh Bantuan Cepat?</h3>
          <p className="text-green-100 text-lg mb-4">
            AI Assistant kami siap membantu 24/7 dengan segala pertanyaan seputar sampah dan lingkungan
          </p>
          <div className="flex flex-wrap justify-center gap-4 text-sm">
            <span className="bg-white/20 px-4 py-2 rounded-full backdrop-blur-sm">🗑️ Pemilahan</span>
            <span className="bg-white/20 px-4 py-2 rounded-full backdrop-blur-sm">♻️ Daur Ulang</span>
            <span className="bg-white/20 px-4 py-2 rounded-full backdrop-blur-sm">🍂 Kompos</span>
            <span className="bg-white/20 px-4 py-2 rounded-full backdrop-blur-sm">💰 Bank Sampah</span>
            <span className="bg-white/20 px-4 py-2 rounded-full backdrop-blur-sm">🌿 Eco Living</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AIAssistant;