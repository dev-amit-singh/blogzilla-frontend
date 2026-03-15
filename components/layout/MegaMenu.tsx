"use client";

import Link from "next/link";

export default function MegaMenu() {
  return (
    <div className="relative group">
      {/* Trigger */}
      <div
        className="
          flex items-center gap-2 cursor-pointer transition
          text-[color:var(--text-subtitle)]
          hover:text-[color:var(--primary)]
        "
      >
        <span className="h-14 flex items-center">Mega Menu</span>

        {/* Ping */}
        <span className="relative flex h-2 w-2">
          <span
            className="
              absolute inline-flex h-full w-full rounded-full
              bg-[color:var(--primary)] opacity-75
              animate-ping
            "
          />
          <span
            className="
              relative inline-flex h-2 w-2 rounded-full
              bg-[color:var(--primary)]
            "
          />
        </span>
      </div>

      {/* CENTERED DROPDOWN */}
      <div className="absolute left-1/2 top-full z-50 hidden w-[100vw] max-w-[980px] -translate-x-1/2 group-hover:block">
        <div
          className="
            rounded-lg overflow-hidden shadow-xl
            bg-[color:var(--bg-card)]
            border border-[color:var(--border-color)]
          "
        >
          <div className="px-12 pt-8">
            <div className="grid grid-cols-4 gap-10 text-sm text-[color:var(--text-subtitle)]">

              {/* Column 1 */}
              <div className="space-y-4">
                <h4
                  className="text-[18px]
                    mb-4 pb-2 font-semibold
                    text-[color:var(--text-title)]
                    border-b border-[color:var(--border-color)]
                  "
                >
                  Travel Blog
                </h4>

                <ul className="space-y-3">
                  {[
                    "Destinations",
                    "Tour Guides",
                    "Travel Food",
                    "Hotels Booking",
                    "Transport Review",
                    "Travel Healthy",
                  ].map((item) => (
                    <li key={item}>
                      <Link
                        href="#"
                        className="
                          group/link relative inline-block transition
                          hover:text-[color:var(--primary)]
                        "
                      >
                        <span className="inline-block transition-transform group-hover/link:translate-x-1">
                          {item}
                        </span>
                        <span
                          className="
                            absolute left-0 -bottom-0.5 h-[2px] w-0
                            bg-[color:var(--primary)]
                            transition-all group-hover/link:w-full
                          "
                        />
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Column 2 */}
              <div className="space-y-4">
                <h4
                  className="text-[18px]
                    mb-4 pb-2 font-semibold
                    text-[color:var(--text-title)]
                    border-b border-[color:var(--border-color)]
                  "
                >
                  Fruit & Vegetables
                </h4>

                <ul className="space-y-3">
                  {[
                    "Meat & Poultry",
                    "Fresh Vegetables",
                    "Herbs & Seasonings",
                    "Cuts & Sprouts",
                    "Exotic Fruits & Veggies",
                    "Packaged Produce",
                  ].map((item) => (
                    <li key={item}>
                      <Link
                        href="#"
                        className="
                          group/link relative inline-block transition
                          hover:text-[color:var(--primary)]
                        "
                      >
                        <span className="inline-block transition-transform group-hover/link:translate-x-1">
                          {item}
                        </span>
                        <span
                          className="
                            absolute left-0 -bottom-0.5 h-[2px] w-0
                            bg-[color:var(--primary)]
                            transition-all group-hover/link:w-full
                          "
                        />
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Column 3 */}
              <div className="space-y-4">
                <h4
                  className="text-[18px]
                    mb-4 pb-2 font-semibold
                    text-[color:var(--text-title)]
                    border-b border-[color:var(--border-color)]
                  "
                >
                  Breakfast & Dairy
                </h4>

                <ul className="space-y-3">
                  {[
                    "Milk & Flavoured Milk",
                    "Butter & Margarine",
                    "Egg Substitutes",
                    "Marmalades",
                    "Sour Cream",
                    "Cheese",
                  ].map((item) => (
                    <li key={item}>
                      <Link
                        href="#"
                        className="
                          group/link relative inline-block transition
                          hover:text-[color:var(--primary)]
                        "
                      >
                        <span className="inline-block transition-transform group-hover/link:translate-x-1">
                          {item}
                        </span>
                        <span
                          className="
                            absolute left-0 -bottom-0.5 h-[2px] w-0
                            bg-[color:var(--primary)]
                            transition-all group-hover/link:w-full
                          "
                        />
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Column 4 */}
              <div className="space-y-4">
                <h4
                  className="text-[18px]
                    mb-4 pb-2 font-semibold
                    text-[color:var(--text-title)]
                    border-b border-[color:var(--border-color)]
                  "
                >
                  Meat & Seafood
                </h4>

                <ul className="space-y-3">
                  {[
                    "Breakfast Sausage",
                    "Dinner Sausage",
                    "Chicken",
                    "Sliced Deli Meat",
                    "Wild Caught Fillets",
                    "Crab & Shellfish",
                  ].map((item) => (
                    <li key={item}>
                      <Link
                        href="#"
                        className="
                          group/link relative inline-block transition
                          hover:text-[color:var(--primary)]
                        "
                      >
                        <span className="inline-block transition-transform group-hover/link:translate-x-1">
                          {item}
                        </span>
                        <span
                          className="
                            absolute left-0 -bottom-0.5 h-[2px] w-0
                            bg-[color:var(--primary)]
                            transition-all group-hover/link:w-full
                          "
                        />
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>

            </div>
          </div>
          <div className="px-12 py-8">
            <div className="grid grid-cols-4 gap-10 text-sm text-[color:var(--text-subtitle)]">

              {/* Column 1 */}
              <div className="space-y-4">
                <h4
                  className="text-[18px]
                    mb-4 pb-2 font-semibold
                    text-[color:var(--text-title)]
                    border-b border-[color:var(--border-color)]
                  "
                >
                  Travel Blog
                </h4>

                <ul className="space-y-3">
                  {[
                    "Destinations",
                    "Tour Guides",
                    "Travel Food",
                    "Hotels Booking",
                    "Transport Review",
                    "Travel Healthy",
                  ].map((item) => (
                    <li key={item}>
                      <Link
                        href="#"
                        className="
                          group/link relative inline-block transition
                          hover:text-[color:var(--primary)]
                        "
                      >
                        <span className="inline-block transition-transform group-hover/link:translate-x-1">
                          {item}
                        </span>
                        <span
                          className="
                            absolute left-0 -bottom-0.5 h-[2px] w-0
                            bg-[color:var(--primary)]
                            transition-all group-hover/link:w-full
                          "
                        />
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Column 2 */}
              <div className="space-y-4">
                <h4
                  className="text-[18px]
                    mb-4 pb-2 font-semibold
                    text-[color:var(--text-title)]
                    border-b border-[color:var(--border-color)]
                  "
                >
                  Fruit & Vegetables
                </h4>

                <ul className="space-y-3">
                  {[
                    "Meat & Poultry",
                    "Fresh Vegetables",
                    "Herbs & Seasonings",
                    "Cuts & Sprouts",
                    "Exotic Fruits & Veggies",
                    "Packaged Produce",
                  ].map((item) => (
                    <li key={item}>
                      <Link
                        href="#"
                        className="
                          group/link relative inline-block transition
                          hover:text-[color:var(--primary)]
                        "
                      >
                        <span className="inline-block transition-transform group-hover/link:translate-x-1">
                          {item}
                        </span>
                        <span
                          className="
                            absolute left-0 -bottom-0.5 h-[2px] w-0
                            bg-[color:var(--primary)]
                            transition-all group-hover/link:w-full
                          "
                        />
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Column 3 */}
              <div className="space-y-4">
                <h4
                  className="text-[18px]
                    mb-4 pb-2 font-semibold
                    text-[color:var(--text-title)]
                    border-b border-[color:var(--border-color)]
                  "
                >
                  Breakfast & Dairy
                </h4>

                <ul className="space-y-3">
                  {[
                    "Milk & Flavoured Milk",
                    "Butter & Margarine",
                    "Egg Substitutes",
                    "Marmalades",
                    "Sour Cream",
                    "Cheese",
                  ].map((item) => (
                    <li key={item}>
                      <Link
                        href="#"
                        className="
                          group/link relative inline-block transition
                          hover:text-[color:var(--primary)]
                        "
                      >
                        <span className="inline-block transition-transform group-hover/link:translate-x-1">
                          {item}
                        </span>
                        <span
                          className="
                            absolute left-0 -bottom-0.5 h-[2px] w-0
                            bg-[color:var(--primary)]
                            transition-all group-hover/link:w-full
                          "
                        />
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Column 4 */}
              <div className="space-y-4">
                <h4
                  className="text-[18px]
                    mb-4 pb-2 font-semibold
                    text-[color:var(--text-title)]
                    border-b border-[color:var(--border-color)]
                  "
                >
                  Meat & Seafood
                </h4>

                <ul className="space-y-3">
                  {[
                    "Breakfast Sausage",
                    "Dinner Sausage",
                    "Chicken",
                    "Sliced Deli Meat",
                    "Wild Caught Fillets",
                    "Crab & Shellfish",
                  ].map((item) => (
                    <li key={item}>
                      <Link
                        href="#"
                        className="
                          group/link relative inline-block transition
                          hover:text-[color:var(--primary)]
                        "
                      >
                        <span className="inline-block transition-transform group-hover/link:translate-x-1">
                          {item}
                        </span>
                        <span
                          className="
                            absolute left-0 -bottom-0.5 h-[2px] w-0
                            bg-[color:var(--primary)]
                            transition-all group-hover/link:w-full
                          "
                        />
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>

            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
