import { useState, useRef, useEffect } from "react";
import { MessageCircle, X, Send, Bot, User } from "lucide-react";

export default function Chatbot({ properties = [] }) {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      role: "assistant",
      content:
        "Hi! I'm your Hi-Tech Homes assistant. I can help you find properties, answer questions about listings, pricing, locations, and more. How can I help you today?",
    },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // AI-powered response using Claude API
  const getAIResponse = async (userMessage, conversationHistory) => {
    try {
      // Prepare property data context
      const propertyContext =
        properties.length > 0
          ? `Available Properties:\n${properties
              .map(
                (p) =>
                  `- ${p.title} in ${p.city}: ${
                    p.bhk
                  } BHK, ₹${p.price?.toLocaleString("en-IN")}, ${p.area} sq.ft`
              )
              .join("\n")}`
          : "No properties currently available in the database.";

      const cities = [...new Set(properties.map((p) => p.city))].filter(
        Boolean
      );
      const priceRange =
        properties.length > 0
          ? `₹${Math.min(...properties.map((p) => p.price || 0)).toLocaleString(
              "en-IN"
            )} - ₹${Math.max(
              ...properties.map((p) => p.price || 0)
            ).toLocaleString("en-IN")}`
          : "Not available";

      const systemPrompt = `You are a helpful real estate assistant for Hi-Tech Homes, a premium property listing website. 

Company Information:
- Name: Hi-Tech Homes
- Phone: +91 98765 43210
- Email: info@hitechhomes.com
- Tagline: "Building dreams into reality"

Current Property Inventory:
- Total Properties: ${properties.length}
- Available Cities: ${cities.join(", ") || "Various locations"}
- Price Range: ${priceRange}

${propertyContext}

Your role:
- Help users find suitable properties based on their requirements
- Answer questions about pricing, locations, amenities, and features
- Provide contact information when needed
- Be friendly, professional, and concise
- If asked about specific properties, refer to the list above
- Encourage users to visit the Listings page or contact the team for detailed information
- Keep responses under 3-4 sentences unless detailed information is requested

Important: Always be helpful and encourage users to contact the team for personalized assistance.`;

      // Prepare conversation for API
      const conversationMessages = conversationHistory.map((msg) => ({
        role: msg.role === "assistant" ? "assistant" : "user",
        content: msg.content,
      }));

      conversationMessages.push({
        role: "user",
        content: userMessage,
      });

      const response = await fetch("https://api.anthropic.com/v1/messages", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          model: "claude-sonnet-4-20250514",
          max_tokens: 500,
          system: systemPrompt,
          messages: conversationMessages,
        }),
      });

      if (!response.ok) {
        throw new Error("API request failed");
      }

      const data = await response.json();
      return data.content[0].text;
    } catch (error) {
      console.error("AI Error:", error);
      // Fallback to rule-based response
      return getFallbackResponse(userMessage);
    }
  };

  // Fallback rule-based response (if AI fails)
  const getFallbackResponse = (userMessage) => {
    const message = userMessage.toLowerCase();

    if (message.match(/^(hi|hello|hey|good morning|good evening)/)) {
      return "Hello! Welcome to Hi-Tech Homes. I'm here to help you find your dream property. What are you looking for?";
    }

    if (
      message.includes("how many properties") ||
      message.includes("total properties")
    ) {
      return `We currently have ${properties.length} premium properties available. Would you like to see them?`;
    }

    if (message.includes("location") || message.includes("city")) {
      const cities = [...new Set(properties.map((p) => p.city))].filter(
        Boolean
      );
      if (cities.length > 0) {
        return `We have properties in: ${cities.join(
          ", "
        )}. Which location interests you?`;
      }
      return "We have properties in various premium locations. Visit our Listings page to explore!";
    }

    if (message.includes("price") || message.includes("budget")) {
      const prices = properties.map((p) => p.price).filter(Boolean);
      if (prices.length > 0) {
        const min = Math.min(...prices);
        const max = Math.max(...prices);
        return `Our properties range from ₹${min.toLocaleString(
          "en-IN"
        )} to ₹${max.toLocaleString("en-IN")}. What's your budget?`;
      }
      return "Visit our Listings page to see detailed pricing for each property.";
    }

    if (message.includes("contact") || message.includes("call")) {
      return "You can reach us at:\n📞 +91 98765 43210\n📧 info@hitechhomes.com\n\nOr visit our Contact page!";
    }

    return "I can help you with:\n• Available properties and locations\n• Pricing information\n• Property features\n• Contact information\n\nWhat would you like to know?";
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!input.trim() || loading) return;

    const userMessage = input.trim();
    setInput("");

    // Add user message
    const newMessages = [...messages, { role: "user", content: userMessage }];
    setMessages(newMessages);
    setLoading(true);

    try {
      // Get AI response
      const botResponse = await getAIResponse(userMessage, messages);
      setMessages([
        ...newMessages,
        { role: "assistant", content: botResponse },
      ]);
    } catch (error) {
      console.error("Chat error:", error);
      const fallbackResponse = getFallbackResponse(userMessage);
      setMessages([
        ...newMessages,
        { role: "assistant", content: fallbackResponse },
      ]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {/* Chat Button */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="fixed bottom-6 right-6 z-50 bg-gradient-to-r from-sky-500 to-sky-600 text-white p-4 rounded-full shadow-2xl hover:shadow-sky-500/50 hover:scale-110 transition-all duration-300 flex items-center gap-2 group"
        >
          <MessageCircle
            size={24}
            className="group-hover:rotate-12 transition-transform"
          />
          <span className="hidden sm:inline font-semibold">Chat with us</span>
        </button>
      )}

      {/* Chat Window */}
      {isOpen && (
        <div className="fixed bottom-6 right-6 z-50 w-96 max-w-[calc(100vw-3rem)] bg-white rounded-2xl shadow-2xl border-2 border-sky-200 flex flex-col overflow-hidden">
          {/* Header */}
          <div className="bg-gradient-to-r from-sky-500 to-sky-600 text-white p-4 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
                <Bot size={20} />
              </div>
              <div>
                <h3 className="font-bold">Hi-Tech Homes AI</h3>
                <p className="text-xs text-white/90">Online now</p>
              </div>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="hover:bg-white/20 p-2 rounded-lg transition-colors"
            >
              <X size={20} />
            </button>
          </div>

          {/* Messages */}
          <div className="flex-1 p-4 space-y-4 overflow-y-auto bg-gray-50 h-96">
            {messages.map((msg, idx) => (
              <div
                key={idx}
                className={`flex gap-2 ${
                  msg.role === "user" ? "justify-end" : "justify-start"
                }`}
              >
                {msg.role === "assistant" && (
                  <div className="w-8 h-8 bg-sky-100 rounded-full flex items-center justify-center flex-shrink-0">
                    <Bot size={16} className="text-sky-600" />
                  </div>
                )}
                <div
                  className={`max-w-[75%] p-3 rounded-2xl ${
                    msg.role === "user"
                      ? "bg-gradient-to-r from-sky-500 to-sky-600 text-white"
                      : "bg-white border border-gray-200 text-gray-800"
                  }`}
                >
                  <p className="text-sm whitespace-pre-line">{msg.content}</p>
                </div>
                {msg.role === "user" && (
                  <div className="w-8 h-8 bg-sky-600 rounded-full flex items-center justify-center flex-shrink-0">
                    <User size={16} className="text-white" />
                  </div>
                )}
              </div>
            ))}
            {loading && (
              <div className="flex gap-2">
                <div className="w-8 h-8 bg-sky-100 rounded-full flex items-center justify-center flex-shrink-0">
                  <Bot size={16} className="text-sky-600" />
                </div>
                <div className="bg-white border border-gray-200 p-3 rounded-2xl">
                  <div className="flex gap-1">
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                    <div
                      className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
                      style={{ animationDelay: "0.1s" }}
                    ></div>
                    <div
                      className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
                      style={{ animationDelay: "0.2s" }}
                    ></div>
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input */}
          <form
            onSubmit={handleSubmit}
            className="p-4 bg-white border-t border-gray-200"
          >
            <div className="flex gap-2">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Ask about properties..."
                className="flex-1 px-4 py-2 border-2 border-gray-200 rounded-full focus:border-sky-500 focus:outline-none text-sm"
                disabled={loading}
              />
              <button
                type="submit"
                disabled={loading || !input.trim()}
                className="bg-gradient-to-r from-sky-500 to-sky-600 text-white p-2 rounded-full hover:shadow-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <Send size={20} />
              </button>
            </div>
          </form>
        </div>
      )}
    </>
  );
}
