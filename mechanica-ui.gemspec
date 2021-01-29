# frozen_string_literal: true

Gem::Specification.new do |spec|
  spec.name          = "mechanica-ui"
  spec.version       = "0.1.0"
  spec.authors       = ["aaron markey"]
  spec.email         = ["markey@hey.com"]

  spec.summary       = "Write a short summary, because Rubygems requires one."
  spec.homepage      = "https://github.com/aaronmarkey/mechanica-ui"
  spec.license       = "MIT"

  spec.files         = `git ls-files -z`.split("\x0").select { |f| f.match(%r!^(assets|_layouts|_includes|_sass|LICENSE|README)!i) }

  spec.add_runtime_dependency "jekyll", "~> 4.2"

  spec.add_development_dependency "bundler", "~> 2.1"
  spec.add_development_dependency "rake", "~> 12.0"
end
