// Search API Service
class SearchService {
    constructor() {
        this.baseURL = process.env.NODE_ENV === 'production' 
            ? 'https://nodejsbackend-wqib.onrender.com' 
            : 'http://localhost:5000';
    }

    async searchProjects(query, options = {}) {
        try {
            const { limit = 10, skip = 0 } = options;
            const params = new URLSearchParams({
                query: query.trim(),
                limit: limit.toString(),
                skip: skip.toString()
            });

            console.log('Searching projects with query:', query);
            
            const response = await fetch(`${this.baseURL}/projects/search?${params}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
                credentials: 'include'
            });

            if (!response.ok) {
                throw new Error(`Search failed: ${response.status} ${response.statusText}`);
            }

            const data = await response.json();
            console.log('Search results:', data);
            
            return {
                success: true,
                data: data.projects || [],
                totalCount: data.totalCount || 0,
                hasMore: data.hasMore || false,
                query: data.query || query
            };
        } catch (error) {
            console.error('Search error:', error);
            return {
                success: false,
                error: error.message,
                data: []
            };
        }
    }

    async getAllProjects(options = {}) {
        try {
            const { limit = 50 } = options;
            
            const response = await fetch(`${this.baseURL}/projects`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
                credentials: 'include'
            });

            if (!response.ok) {
                throw new Error(`Failed to fetch projects: ${response.status} ${response.statusText}`);
            }

            const projects = await response.json();
            
            return {
                success: true,
                data: projects.slice(0, limit),
                totalCount: projects.length
            };
        } catch (error) {
            console.error('Fetch projects error:', error);
            return {
                success: false,
                error: error.message,
                data: []
            };
        }
    }

    // Helper method to construct image URLs
    getImageUrl(imgLink) {
        if (!imgLink) return '';
        
        // If it's already a full URL, return as is
        if (imgLink.startsWith('http') || imgLink.startsWith('data:')) {
            return imgLink;
        }
        
        // If it starts with a slash, remove it to avoid double slash
        const cleanPath = imgLink.startsWith('/') ? imgLink.slice(1) : imgLink;
        return `${this.baseURL}/${cleanPath}`;
    }

    // Helper method to highlight search terms in text
    highlightSearchTerm(text, searchTerm) {
        if (!text || !searchTerm) return text;
        
        const regex = new RegExp(`(${searchTerm})`, 'gi');
        return text.replace(regex, '<mark>$1</mark>');
    }

    // Debounced search function
    createDebouncedSearch(delay = 300) {
        let timeoutId;
        
        return (query, options = {}) => {
            return new Promise((resolve) => {
                clearTimeout(timeoutId);
                
                if (!query || query.trim().length < 2) {
                    resolve({ success: true, data: [], totalCount: 0 });
                    return;
                }
                
                timeoutId = setTimeout(async () => {
                    const result = await this.searchProjects(query, options);
                    resolve(result);
                }, delay);
            });
        };
    }
}

// Create and export a singleton instance
const searchService = new SearchService();
export default searchService;

// Export individual methods for convenience
export const {
    searchProjects,
    getAllProjects,
    getImageUrl,
    highlightSearchTerm,
    createDebouncedSearch
} = searchService;
