module Jekyll
  module PostAndCategoryFilter
    RESTRICTED_CATEGORIES = ['profiles', 'blog']
 
    # Returns back all categories related to a primary category
    # e.g. "profiles" and "blog"
    def filter_categories_by_primary_category(posts)
      filtered = []
      for post in posts
        for post_category in post.categories
          filtered.push(post_category) unless RESTRICTED_CATEGORIES.include? post_category
        end
      end
      filtered.sort.uniq
    end
  end
end
 
Liquid::Template.register_filter(Jekyll::PostAndCategoryFilter)
