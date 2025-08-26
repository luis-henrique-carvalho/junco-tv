import { FC } from "react";
import { Content } from "@prismicio/client";
import { SliceComponentProps, PrismicRichText, PrismicLink } from "@prismicio/react";
import { PrismicNextImage } from "@prismicio/next";

/**
 * Props for `HeroStatsWithActions`.
 */
export type HeroStatsWithActionsProps =
  SliceComponentProps<Content.HeroStatsWithActionsSlice>;

/**
 * Component for "HeroStatsWithActions" Slices.
 */
const HeroStatsWithActions: FC<HeroStatsWithActionsProps> = ({ slice }) => {
  return (
    <section
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
      className="relative min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800 overflow-hidden"
    >
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg width=&quot;60&quot; height=&quot;60&quot; viewBox=&quot;0 0 60 60&quot; xmlns=&quot;http://www.w3.org/2000/svg&quot;%3E%3Cg fill=&quot;none&quot; fill-rule=&quot;evenodd&quot;%3E%3Cg fill=&quot;%239C92AC&quot; fill-opacity=&quot;0.4&quot;%3E%3Ccircle cx=&quot;30&quot; cy=&quot;30&quot; r=&quot;2&quot;/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')]"></div>
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Content Column */}
          <div className="space-y-8">
            {/* Title */}
            {slice.primary.title && (
              <div className="space-y-4">
                <PrismicRichText
                  field={slice.primary.title}
                  components={{
                    heading1: ({ children }) => (
                      <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 dark:text-white leading-tight">
                        {children}
                      </h1>
                    ),
                  }}
                />
              </div>
            )}

            {/* Description */}
            {slice.primary.description && (
              <div className="prose prose-lg dark:prose-invert max-w-none">
                <PrismicRichText
                  field={slice.primary.description}
                  components={{
                    paragraph: ({ children }) => (
                      <p className="text-xl text-gray-600 dark:text-gray-300 leading-relaxed">
                        {children}
                      </p>
                    ),
                  }}
                />
              </div>
            )}

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4">
              {slice.primary.primary_cta && (
                <PrismicLink
                  field={slice.primary.primary_cta}
                  className="inline-flex items-center justify-center px-8 py-4 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg transition-colors duration-200 shadow-lg hover:shadow-xl"
                >
                  {slice.primary.primary_cta.text || "Get Started"}
                </PrismicLink>
              )}
              {slice.primary.secondary_cta && (
                <PrismicLink
                  field={slice.primary.secondary_cta}
                  className="inline-flex items-center justify-center px-8 py-4 border-2 border-gray-300 hover:border-gray-400 text-gray-700 dark:text-gray-300 dark:border-gray-600 dark:hover:border-gray-500 font-semibold rounded-lg transition-colors duration-200"
                >
                  {slice.primary.secondary_cta.text || "Learn More"}
                </PrismicLink>
              )}
            </div>

            {/* Statistics */}
            {slice.primary.stats && slice.primary.stats.length > 0 && (
              <div className="grid grid-cols-2 md:grid-cols-3 gap-6 pt-8 border-t border-gray-200 dark:border-gray-700">
                {slice.primary.stats.map((stat, index) => (
                  <div key={index} className="text-center">
                    <div className="text-3xl md:text-4xl font-bold text-blue-600 dark:text-blue-400">
                      {stat.value}
                    </div>
                    <div className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                      {stat.label}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Media Column */}
          <div className="relative">
            {slice.primary.main_media && (
              <div className="relative">
                <div className="absolute -inset-4 bg-gradient-to-r from-blue-400 to-purple-500 rounded-2xl opacity-20 blur-xl"></div>
                <div className="relative rounded-2xl overflow-hidden shadow-2xl">
                  <PrismicNextImage
                    field={slice.primary.main_media}
                    className="w-full h-auto"
                    priority
                  />
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Feature Cards */}
        {slice.primary.features && slice.primary.features.length > 0 && (
          <div className="mt-20">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {slice.primary.features.map((feature, index) => (
                <div
                  key={index}
                  className="group bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100 dark:border-gray-700 hover:border-blue-200 dark:hover:border-blue-600"
                >
                  {feature.icon && (
                    <div className="w-12 h-12 mb-4 rounded-lg bg-blue-100 dark:bg-blue-900 flex items-center justify-center">
                      <PrismicNextImage
                        field={feature.icon}
                        className="w-6 h-6"
                      />
                    </div>
                  )}
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
                    {feature.heading}
                  </h3>
                  {feature.link && (
                    <PrismicLink
                      field={feature.link}
                      className="inline-flex items-center text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 font-medium transition-colors duration-200 group-hover:translate-x-1"
                    >
                      Learn more
                      <svg
                        className="w-4 h-4 ml-1"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M9 5l7 7-7 7"
                        />
                      </svg>
                    </PrismicLink>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default HeroStatsWithActions;
