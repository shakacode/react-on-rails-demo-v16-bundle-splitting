# frozen_string_literal: true

class RscMarkdownPageController < ApplicationController
  include ReactOnRailsPro::Stream

  def index
    @rsc_markdown_page_props = {
      title: "React Server Components Demo",
      author: "Demo System",
      lastModified: Time.current
    }

    stream_view_containing_react_components(template: "rsc_markdown_page/index")
  end
end
