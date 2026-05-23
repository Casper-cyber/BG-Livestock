import { motion } from "motion/react";
import { Dog, MapPin, Phone } from "lucide-react";

export default function AboutUsPage() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="bg-farm-white py-12 md:py-20 paper-texture"
    >
      <div className="max-w-7xl mx-auto px-6 md:px-10">
        
        {/* Header Block */}
        <div className="text-center mb-16 max-w-2xl mx-auto">
          <p className="text-farm-green uppercase text-[10px] font-bold tracking-[0.4em] mb-3">Our Story</p>
          <h1 className="text-5xl md:text-6xl font-serif text-farm-brown tracking-tight mb-4">
            Anderson Farm to Table
          </h1>
          <div className="w-16 h-1 bg-farm-green mx-auto mb-6" />
          <p className="font-hand text-xl text-farm-green leading-snug">
            "Real food raised with real care by real people."
          </p>
        </div>

        {/* Story Section & Animals Grid */}
        <div className="grid lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          
          {/* Story Copy (Left Column) */}
          <div className="lg:col-span-7 space-y-6">
            <p className="text-lg md:text-xl font-serif text-farm-brown leading-relaxed font-semibold">
              Located in the rolling countryside of Beechgrove, Tennessee, Anderson Farm is owned and operated by Jeff and Tacey Anderson, a husband and wife team dedicated to raising real food with real care.
            </p>
            
            <p className="text-base font-serif text-farm-brown/85 leading-relaxed">
              Our days begin with our gentle Jersey cows, whose rich, golden raw milk is the heart of our dairy. From that milk, we craft butter and heavy cream the old fashioned way — slow, simple, and full of honest flavor.
            </p>
            
            <p className="text-base font-serif text-farm-brown/85 leading-relaxed">
              Across the pasture, our free range chickens roam freely, producing fresh, nutrient rich eggs from birds that spend their days scratching, exploring, and living naturally.
            </p>

            <p className="text-base font-serif text-farm-brown/85 leading-relaxed">
              Just steps from the barn, our garden thrives with fresh vegetables picked at their peak, grown in healthy soil and harvested by hand. What we gather in the morning often reaches your table the very same day.
            </p>

            <p className="text-base font-serif text-farm-brown/85 leading-relaxed">
              And we’re growing. Soon, we’ll be offering beef and lamb raised right here on the farm, giving families access to meat that’s pasture raised, responsibly cared for, and full of homegrown quality.
            </p>

            <div className="p-6 bg-farm-cream/30 border border-farm-brown/10 rounded-xl my-8">
              <p className="text-base font-serif italic text-farm-brown/90 leading-relaxed">
                "For us, farm to table isn’t a trend — it’s our way of life. It’s knowing your farmers, trusting your food, and savoring the difference that comes from land tended with love."
              </p>
            </div>

            <p className="text-lg md:text-xl font-serif text-farm-green font-semibold italic">
              Welcome to Anderson Farm in Beechgrove, TN. Welcome to food the way it should be.
            </p>
          </div>

          {/* Animals & Guardians (Right Column) */}
          <div className="lg:col-span-5 flex flex-col items-center">
            
            <div className="w-full max-w-sm bg-white border border-farm-brown/10 rounded-2xl p-6 shadow-xl relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-farm-green/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
              
              <h3 className="font-serif text-2xl text-farm-brown font-bold mb-1">Our Herd & Guardians</h3>
              <p className="text-[10px] uppercase font-bold tracking-[0.2em] text-farm-green mb-6">The True Heart of Anderson Farm</p>
              
              <div className="space-y-6">
                
                {/* 1. Loyal Guardian Dog (KEEP Dog Graphic) */}
                <div className="flex gap-4 p-4 rounded-xl border border-farm-green/20 bg-farm-green/5 transition-all hover:shadow-sm">
                  <div className="w-12 h-12 rounded-full bg-farm-green/10 flex items-center justify-center shrink-0 border border-farm-green/20">
                    <Dog className="text-farm-green" size={24} />
                  </div>
                  <div>
                    <h4 className="font-serif font-bold text-farm-brown text-base flex items-center gap-2">
                      Our Guardian Dog
                      <span className="text-[8px] bg-farm-green text-white font-sans uppercase tracking-[0.1em] font-bold px-2 py-0.5 rounded-full">Always On Duty</span>
                    </h4>
                    <p className="text-xs text-farm-brown/70 font-serif italic mt-1 leading-relaxed">
                      Loves greeting guests, chasing playful squirrels, and ensuring the absolute safety of our entire free-range poultry flock.
                    </p>
                  </div>
                </div>

                {/* 2. Gentle Jersey Cows */}
                <div className="flex gap-4 p-4 rounded-xl border border-farm-brown/10 hover:border-farm-brown/20 bg-white transition-all hover:shadow-sm">
                  <div className="w-12 h-12 rounded-full bg-farm-brown/5 flex items-center justify-center shrink-0 border border-farm-brown/15">
                    {/* Beautiful Cow Flat Vector Icon */}
                    <svg viewBox="0 0 24 24" className="w-6 h-6 fill-farm-brown/85">
                      <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-2h2v2zm2-5c0 1.1-.9 2-2 2h-2c-1.1 0-2-.9-2-2V9c0-1.1.9-2 2-2h2c1.1 0 2 .9 2 2v3zM8 8V6h1v2H8zm7 0V6h1v2h-1z" />
                    </svg>
                  </div>
                  <div>
                    <h4 className="font-serif font-bold text-farm-brown text-base">Gentle Jersey Cows</h4>
                    <p className="text-xs text-farm-brown/70 font-serif italic mt-1 leading-relaxed">
                      Our beloved milking group who provide the golden, nutrient-packed raw A2A2 dairy at the core of our farm.
                    </p>
                  </div>
                </div>

                {/* 3. Pastured Poultry */}
                <div className="flex gap-4 p-4 rounded-xl border border-farm-brown/10 hover:border-farm-brown/20 bg-white transition-all hover:shadow-sm">
                  <div className="w-12 h-12 rounded-full bg-farm-brown/5 flex items-center justify-center shrink-0 border border-farm-brown/15">
                    {/* Beautiful Poultry/Chicken Vector Icon */}
                    <svg viewBox="0 0 24 24" className="w-6 h-6 fill-farm-brown/85">
                      <path d="M12 2a4 4 0 0 0-4 4c0 3.31 2.69 6 6 6s6-2.69 6-6a4 4 0 0 0-4-4zm-1.5 5.5a1.5 1.5 0 1 1 3 0 1.5 1.5 0 0 1-3 0zm4.5 9c-.5 0-.9-.3-1.1-.7l-1-2.2a2 2 0 0 0-3.6 0l-1 2.2c-.3.4-.7.7-1.1.7A2.1 2.1 0 0 0 4 18.9v2.1c0 .6.4 1 1 1h14c.6 0 1-.4 1-1v-2.1c0-1.1-.9-2.1-2.1-2.1z" />
                    </svg>
                  </div>
                  <div>
                    <h4 className="font-serif font-bold text-farm-brown text-base">Pasture-Raised Chickens</h4>
                    <p className="text-xs text-farm-brown/70 font-serif italic mt-1 leading-relaxed">
                      Our high-spirited layers who spend their days exploring green Tennessee fields to produce rich, orange-yolk eggs.
                    </p>
                  </div>
                </div>

                {/* 4. Pastured Lambs & Sheep */}
                <div className="flex gap-4 p-4 rounded-xl border border-farm-brown/10 hover:border-farm-brown/20 bg-white transition-all hover:shadow-sm">
                  <div className="w-12 h-12 rounded-full bg-farm-brown/5 flex items-center justify-center shrink-0 border border-farm-brown/15">
                    {/* Beautiful Sheep/Lamb Vector Icon */}
                    <svg viewBox="0 0 24 24" className="w-6 h-6 fill-farm-brown/85">
                      <path d="M19 13c.3 0 .5-.1.7-.3l1.6-1.6c.4-.4.4-1 0-1.4l-1.6-1.6C19.5 8.1 19.3 8 19 8h-3c0-2.2-1.8-4-4-4S8 5.8 8 8H5c-.3 0-.5.1-.7.3L2.7 9.9c-.4.4-.4 1 0 1.4l1.6 1.6c.2.2.4.3.7.3h1v4H5v2h14v-2h-1v-4h1z" />
                    </svg>
                  </div>
                  <div>
                    <h4 className="font-serif font-bold text-farm-brown text-base">Pasture Lambs & Sheep</h4>
                    <p className="text-xs text-farm-brown/70 font-serif italic mt-1 leading-relaxed">
                      Grazing across open meadows, our woolly flock is raising the next generation in beautiful co-existence with our Jersey cows.
                    </p>
                  </div>
                </div>

              </div>
            </div>

            {/* Farm highlights side-badge */}
            <div className="mt-8 space-y-4 w-full max-w-sm">
              <div className="flex items-center gap-4 text-xs font-bold uppercase tracking-[0.15em] text-farm-brown/80 p-4 border border-farm-brown/5 bg-farm-cream/15 rounded-lg shadow-sm">
                <MapPin size={18} className="text-farm-green shrink-0" />
                <span>Beechgrove, Tennessee</span>
              </div>
              <div className="flex items-center gap-4 text-xs font-bold uppercase tracking-[0.15em] text-farm-brown/80 p-4 border border-farm-brown/5 bg-farm-cream/15 rounded-lg shadow-sm">
                <Phone size={18} className="text-farm-green shrink-0" />
                <span>931-212-0287</span>
              </div>
            </div>
          </div>
          
        </div>

      </div>
    </motion.div>
  );
}
