source "https://rubygems.org"

# Jekyll and GitHub Pages
gem "jekyll", "~> 4.3.0"
gem "minima", "~> 2.5"

# Jekyll plugins
group :jekyll_plugins do
  gem "jekyll-feed", "~> 0.12"
  gem "jekyll-seo-tag", "~> 2.8"
  gem "jekyll-sitemap", "~> 1.4"
end

# Windows and JRuby support
platforms :mingw, :x64_mingw, :mswin, :jruby do
  gem "tzinfo", ">= 1", "< 3"
  gem "tzinfo-data"
end

# Performance-booster for watching directories on Windows
gem "wdm", "~> 0.1", :platforms => [:mingw, :x64_mingw, :mswin]

# Lock http_parser.rb gem to v0.6.x for JRuby builds
gem "http_parser.rb", "~> 0.6.0", :platforms => [:jruby]