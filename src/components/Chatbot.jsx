import { useState, useRef, useEffect, useContext } from "react";
import { MessageCircle, X, Send, Bot, User } from "lucide-react";
import { PropertyContext } from "../context/PropertyContext";

export default function Chatbot({ properties: propsProperties = [], setCurrentPage, setSelectedProperty }) {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      role: "assistant",
      content:
        "Welcome to Hi-Tech Homes — I can help you find properties. Click 'Find listings' below to start a quick search.",
    },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef(null);
  // Guided flow state
  const [flowStep, setFlowStep] = useState("idle");
  const [selectedCity, setSelectedCity] = useState("");
  const [selectedFilter, setSelectedFilter] = useState(""); // 'bhk' or 'area'
  const [selectedBhk, setSelectedBhk] = useState("");
  const [areaValue, setAreaValue] = useState("");
  const [lastResults, setLastResults] = useState([]);

  // Use properties from context if not passed as prop
  const ctx = useContext(PropertyContext);
  const properties = Array.isArray(propsProperties) && propsProperties.length > 0 ? propsProperties : (ctx?.properties || []);

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

  // --- Guided flow helpers ---
  const uniqueCities = [...new Set((properties || []).map((p) => p.city))].filter(Boolean);

  const startFindFlow = () => {
    setFlowStep("chooseCity");
    setMessages((m) => [...m, { role: "assistant", content: "Great — first, please choose your preferred location:" }]);
  };

  const chooseCity = (city) => {
    setSelectedCity(city);
    setFlowStep("chooseFilter");
    setMessages((m) => [...m, { role: "user", content: city }, { role: "assistant", content: `Got it — ${city}. Do you want to filter by bedrooms or by area (sq.ft)?` }]);
  };

  const chooseFilter = (filter) => {
    setSelectedFilter(filter);
    if (filter === "bhk") {
      setFlowStep("chooseBhk");
      setMessages((m) => [...m, { role: "user", content: "Bedrooms" }, { role: "assistant", content: "How many bedrooms? Choose from available options:" }]);
    } else {
      setFlowStep("chooseArea");
      setMessages((m) => [...m, { role: "user", content: "Area" }, { role: "assistant", content: "Enter desired minimum square feet (e.g. 500):" }]);
    }
  };

  const chooseBhk = (bhk) => {
    setSelectedBhk(bhk);
    // filter properties and show results
    const results = (properties || []).filter((p) => p.city === selectedCity && String(p.bhk) === String(bhk));
    showResults(results, `Sorry, we have no listings right now for ${bhk} BHK in ${selectedCity}.`);
    setFlowStep("results");
    setMessages((m) => [...m, { role: "user", content: `${bhk} BHK` }]);
  };

  const chooseAreaSubmit = () => {
    // kept for backwards compatibility but not used in UI anymore
    const num = parseFloat(areaValue);
    const results = (properties || []).filter((p) => p.city === selectedCity && parseFloat(p.area || 0) >= (Number.isNaN(num) ? 0 : num));
    showResults(results, `Sorry, we have no listings right now >= ${num} sq.ft in ${selectedCity}.`);
    setFlowStep("results");
    setMessages((m) => [...m, { role: "user", content: `${num} sq.ft` }]);
  };

  const chooseAreaRange = (num) => {
    const results = (properties || []).filter((p) => p.city === selectedCity && parseFloat(p.area || 0) >= num);
    showResults(results, `Sorry, we have no listings right now >= ${num} sq.ft in ${selectedCity}.`);
    setFlowStep('results');
  };

  const showResults = (results, noneMessage) => {
    setLastResults(results || []);
    if (!results || results.length === 0) {
      setMessages((m) => [...m, { role: "assistant", content: noneMessage + " Please contact us for help." }]);
    } else {
      const summary = results
        .map((r) => `${r.title} — ${r.bhk} BHK — ${r.area} sq.ft — ₹${r.price?.toLocaleString("en-IN")}`)
        .join("\n\n");
      setMessages((m) => [...m, { role: "assistant", content: `Found ${results.length} matching listings:` }]);
    }
  };

  const viewProperty = (propertyId) => {
    const prop = (properties || []).find((p) => p._id === propertyId);
    if (prop) {
      setSelectedProperty && setSelectedProperty(prop);
      setCurrentPage && setCurrentPage("property-details");
      setIsOpen(false);
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
                  className={`max-w-[75%] p-3 rounded-2xl shadow-sm ${
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

            {/* Render matching property cards (if any) */}
            {lastResults && lastResults.length > 0 && (
              <div className="px-4 pb-4">
                <div className="space-y-2">
                  {lastResults.map((p) => (
                    <div key={p._id} className="flex items-center gap-3 p-2 border rounded bg-white">
                      <img src={p.images?.[0]?.secure_url || p.image || '/favicon.ico'} alt={p.title} className="w-20 h-14 object-cover rounded" />
                      <div className="flex-1">
                        <div className="font-semibold">{p.title}</div>
                        <div className="text-xs text-gray-500">{p.city} • {p.bhk} BHK • {p.area} sq.ft</div>
                        <div className="text-sm font-medium">₹{p.price?.toLocaleString('en-IN')}</div>
                      </div>
                      <div>
                        <button onClick={() => viewProperty(p._id)} className="px-3 py-1 bg-sky-600 text-white rounded text-sm">View</button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
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

            {/* Quick flow controls inline (no free-text) */}
            <div className="p-3 bg-white border-t border-gray-200">
              <div className="flex flex-wrap gap-2 items-center">
                {flowStep === 'idle' && (
                  <button onClick={startFindFlow} className="px-3 py-1 bg-sky-100 rounded">Find listings</button>
                )}

                {flowStep === 'chooseCity' && (
                  (uniqueCities.length === 0) ? (
                    <div className="text-sm text-gray-500">No locations available</div>
                  ) : (
                    uniqueCities.map((c) => (
                      <button key={c} onClick={() => chooseCity(c)} className="px-3 py-1 bg-sky-50 border rounded text-sm">{c}</button>
                    ))
                  )
                )}

                {flowStep === 'chooseFilter' && (
                  <>
                    <button onClick={() => chooseFilter('bhk')} className="px-3 py-1 bg-sky-50 border rounded text-sm">Bedrooms</button>
                    <button onClick={() => chooseFilter('area')} className="px-3 py-1 bg-sky-50 border rounded text-sm">Area</button>
                  </>
                )}

                {flowStep === 'chooseBhk' && (
                  // show fixed 1-5 BHK options per request
                  [1,2,3,4,5].map((b) => (
                    <button key={b} onClick={() => chooseBhk(b)} className="px-3 py-1 bg-sky-50 border rounded text-sm">{b} BHK</button>
                  ))
                )}

                {flowStep === 'chooseArea' && (
                  <>
                    <button onClick={() => chooseAreaRange(500)} className="px-3 py-1 bg-sky-50 border rounded text-sm">500+</button>
                    <button onClick={() => chooseAreaRange(1000)} className="px-3 py-1 bg-sky-50 border rounded text-sm">1000+</button>
                    <button onClick={() => chooseAreaRange(1500)} className="px-3 py-1 bg-sky-50 border rounded text-sm">1500+</button>
                  </>
                )}

                {flowStep === 'results' && (
                  <>
                    <button onClick={()=>{ setCurrentPage && setCurrentPage('listings'); setIsOpen(false); }} className="px-3 py-1 bg-green-100 rounded text-sm">Go to Listings</button>
                    <button onClick={()=>{ setCurrentPage && setCurrentPage('contact'); setIsOpen(false); }} className="px-3 py-1 bg-yellow-100 rounded text-sm">Contact Us</button>
                    <button onClick={()=>{ setFlowStep('idle'); setLastResults([]); setMessages([{ role: 'assistant', content: "Welcome to Hi-Tech Homes — I can help you find properties. Click 'Find listings' below to start a quick search." }]); }} className="px-3 py-1 bg-gray-100 rounded text-sm">Start over</button>
                  </>
                )}
              </div>
            </div>
          </div>
        )}
          {/* Guided flow quick actions area (when open) */}
          {isOpen && (
            <div style={{ position: 'fixed', bottom: 20, right: 24, zIndex: 60 }}>
              {/* Render quick flow controls below the chat window */}
              <div className="w-96 max-w-[calc(100vw-3rem)]">
                {flowStep === 'idle' && (
                  <div className="p-3 flex gap-2 justify-center">
                    <button onClick={startFindFlow} className="px-4 py-2 bg-blue-600 text-white rounded">Find listings</button>
                  </div>
                )}

                {flowStep === 'chooseCity' && (
                  <div className="p-3 bg-white rounded shadow space-y-2">
                    <div className="font-semibold">Choose a location</div>
                    <div className="flex flex-wrap gap-2 mt-2">
                      {uniqueCities.length === 0 && <div className="text-sm text-gray-500">No cities available</div>}
                      {uniqueCities.map((c) => (
                        <button key={c} onClick={() => chooseCity(c)} className="px-3 py-1 bg-sky-100 rounded">{c}</button>
                      ))}
                    </div>
                  </div>
                )}

                {flowStep === 'chooseFilter' && (
                  <div className="p-3 bg-white rounded shadow">
                    <div className="font-semibold">Filter by</div>
                    <div className="flex gap-2 mt-2">
                      <button onClick={() => chooseFilter('bhk')} className="px-3 py-1 bg-sky-100 rounded">Bedrooms</button>
                      <button onClick={() => chooseFilter('area')} className="px-3 py-1 bg-sky-100 rounded">Area (sq.ft)</button>
                    </div>
                  </div>
                )}

                {flowStep === 'chooseBhk' && (
                  <div className="p-3 bg-white rounded shadow">
                    <div className="font-semibold">Choose bedrooms</div>
                    <div className="flex gap-2 mt-2">
                      {[...new Set((properties||[]).filter(p=>p.city===selectedCity).map(p=>p.bhk))].filter(Boolean).map((b) => (
                        <button key={b} onClick={() => chooseBhk(b)} className="px-3 py-1 bg-sky-100 rounded">{b} BHK</button>
                      ))}
                    </div>
                  </div>
                )}

                {flowStep === 'chooseArea' && (
                  <div className="p-3 bg-white rounded shadow">
                    <div className="font-semibold">Enter minimum sq.ft</div>
                    <div className="flex gap-2 mt-2">
                      <input value={areaValue} onChange={(e)=>setAreaValue(e.target.value)} placeholder="e.g. 500" className="px-3 py-1 border rounded flex-1" />
                      <button onClick={chooseAreaSubmit} className="px-3 py-1 bg-sky-100 rounded">Search</button>
                    </div>
                  </div>
                )}

                {flowStep === 'results' && (
                  <div className="p-3 bg-white rounded shadow">
                    <div className="font-semibold">Results</div>
                    <div className="mt-2 text-sm text-gray-600">Use the chat above to see a summary. You can also go to Listings or Contact us.</div>
                    <div className="mt-3 flex gap-2">
                      <button onClick={()=>{ setCurrentPage && setCurrentPage('listings'); setIsOpen(false); }} className="px-3 py-1 bg-green-100 rounded">Go to Listings</button>
                      <button onClick={()=>{ setCurrentPage && setCurrentPage('contact'); setIsOpen(false); }} className="px-3 py-1 bg-yellow-100 rounded">Contact Us</button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}
    </>
  );
}
