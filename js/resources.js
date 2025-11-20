// Resources Management System
document.addEventListener('DOMContentLoaded', function() {
    // Initialize resources system
    initializeResources();
    
    // Event Listeners
    document.getElementById('searchResources').addEventListener('input', filterResources);
    document.getElementById('categoryFilter').addEventListener('change', filterResources);
    document.getElementById('typeFilter').addEventListener('change', filterResources);
    document.getElementById('sortResources').addEventListener('change', filterResources);
    document.getElementById('closeResourceModal').addEventListener('click', () => hideModal('resourceModal'));

    // Close modal on outside click
    document.getElementById('resourceModal').addEventListener('click', (e) => {
        if (e.target === document.getElementById('resourceModal')) {
            hideModal('resourceModal');
        }
    });
});

function initializeResources() {
    // Seed resources data (20+ resources)
    const seededResources = [
        {
            id: 1,
            title: "5 Simple Ways to Reduce Food Waste",
            description: "Practical tips for minimizing food waste in your household, from proper storage to creative leftover recipes.",
            category: "waste-reduction",
            type: "article",
            url: "#",
            readTime: "5 min read",
            featured: true
        },
        {
            id: 2,
            title: "Proper Food Storage Guide",
            description: "Learn how to store different types of food to maximize freshness and extend shelf life.",
            category: "storage-tips",
            type: "guide",
            url: "#",
            readTime: "8 min read",
            featured: true
        },
        {
            id: 3,
            title: "Budget-Friendly Meal Planning",
            description: "How to plan meals that save money while reducing food waste and eating healthy.",
            category: "budget-tips",
            type: "video",
            url: "#",
            duration: "12:30",
            featured: true
        },
        {
            id: 4,
            title: "Understanding Food Labels",
            description: "A comprehensive guide to reading and understanding nutrition facts and expiration dates.",
            category: "nutrition",
            type: "article",
            url: "#",
            readTime: "6 min read"
        },
        {
            id: 5,
            title: "Quick Tips: Freezing Food Properly",
            description: "Essential tips for freezing different types of food to maintain quality and prevent freezer burn.",
            category: "storage-tips",
            type: "tip",
            url: "#",
            readTime: "3 min read"
        },
        {
            id: 6,
            title: "Sustainable Cooking Practices",
            description: "Learn how to cook in ways that reduce environmental impact and food waste.",
            category: "sustainable-cooking",
            type: "article",
            url: "#",
            readTime: "7 min read"
        },
        {
            id: 7,
            title: "Meal Prep for Busy Families",
            description: "Efficient meal preparation strategies that save time and reduce food waste for families.",
            category: "meal-planning",
            type: "video",
            url: "#",
            duration: "15:45"
        },
        {
            id: 8,
            title: "Reducing Plastic in Your Kitchen",
            description: "Practical alternatives to single-use plastics in food storage and preparation.",
            category: "sustainable-cooking",
            type: "article",
            url: "#",
            readTime: "5 min read"
        },
        {
            id: 9,
            title: "Smart Grocery Shopping Guide",
            description: "How to shop smarter to avoid food waste and save money on groceries.",
            category: "budget-tips",
            type: "guide",
            url: "#",
            readTime: "10 min read"
        },
        {
            id: 10,
            title: "Nutrition for Different Life Stages",
            description: "Understanding nutritional needs from childhood through senior years.",
            category: "nutrition",
            type: "article",
            url: "#",
            readTime: "12 min read"
        },
        {
            id: 11,
            title: "Composting at Home",
            description: "Beginner's guide to composting food scraps and reducing landfill waste.",
            category: "waste-reduction",
            type: "video",
            url: "#",
            duration: "8:20"
        },
        {
            id: 12,
            title: "Quick Tip: Reviving Wilted Vegetables",
            description: "Simple techniques to bring wilted vegetables back to life and reduce waste.",
            category: "waste-reduction",
            type: "tip",
            url: "#",
            readTime: "2 min read"
        },
        {
            id: 13,
            title: "Seasonal Eating Guide",
            description: "Benefits of eating seasonally and how to incorporate seasonal produce into your diet.",
            category: "nutrition",
            type: "guide",
            url: "#",
            readTime: "9 min read"
        },
        {
            id: 14,
            title: "Reducing Food Waste in Restaurants",
            description: "Tips for minimizing waste when eating out and supporting sustainable restaurants.",
            category: "waste-reduction",
            type: "article",
            url: "#",
            readTime: "6 min read"
        },
        {
            id: 15,
            title: "Plant-Based Nutrition Basics",
            description: "Essential nutrients and meal ideas for those exploring plant-based diets.",
            category: "nutrition",
            type: "article",
            url: "#",
            readTime: "11 min read"
        },
        {
            id: 16,
            title: "Food Preservation Methods",
            description: "Traditional and modern techniques for preserving food without refrigeration.",
            category: "storage-tips",
            type: "video",
            url: "#",
            duration: "18:15"
        },
        {
            id: 17,
            title: "Quick Tip: Smart Leftover Management",
            description: "Creative ways to repurpose leftovers into new meals and reduce waste.",
            category: "meal-planning",
            type: "tip",
            url: "#",
            readTime: "3 min read"
        },
        {
            id: 18,
            title: "Eating Healthy on a Tight Budget",
            description: "Strategies for maintaining a nutritious diet while watching your food budget.",
            category: "budget-tips",
            type: "article",
            url: "#",
            readTime: "7 min read"
        },
        {
            id: 19,
            title: "Reducing Food Packaging Waste",
            description: "How to minimize packaging waste when shopping for and storing food.",
            category: "sustainable-cooking",
            type: "guide",
            url: "#",
            readTime: "8 min read"
        },
        {
            id: 20,
            title: "Understanding Expiration Dates",
            description: "What different expiration dates really mean and when food is actually safe to eat.",
            category: "waste-reduction",
            type: "article",
            url: "#",
            readTime: "6 min read"
        },
        {
            id: 21,
            title: "Quick Tip: Proper Herb Storage",
            description: "Best practices for storing fresh herbs to extend their lifespan.",
            category: "storage-tips",
            type: "tip",
            url: "#",
            readTime: "2 min read"
        },
        {
            id: 22,
            title: "Community Food Sharing Programs",
            description: "How to participate in or start food sharing initiatives in your community.",
            category: "sustainable-cooking",
            type: "article",
            url: "#",
            readTime: "5 min read"
        }
    ];

    // Initialize resources in localStorage if not exists
    if (!localStorage.getItem('resources')) {
        localStorage.setItem('resources', JSON.stringify(seededResources));
    }

    // Load and display resources
    loadResources();
    updateResourceStatistics();
}

function loadResources() {
    const resources = JSON.parse(localStorage.getItem('resources')) || [];
    const container = document.getElementById('resourcesContainer');
    const emptyState = document.getElementById('emptyState');

    if (resources.length === 0) {
        container.innerHTML = '';
        emptyState.classList.remove('hidden');
        return;
    }

    emptyState.classList.add('hidden');
    container.innerHTML = '';

    resources.forEach(resource => {
        const resourceCard = createResourceCard(resource);
        container.appendChild(resourceCard);
    });
}

function createResourceCard(resource) {
    const card = document.createElement('div');
    card.className = 'resource-card bg-white rounded-xl shadow-sm border border-gray-200 p-6 cursor-pointer';
    card.onclick = () => openResourceModal(resource);

    const typeIcon = getTypeIcon(resource.type);
    const durationInfo = resource.duration ? `<span class="text-gray-500 text-sm">${resource.duration}</span>` : 
                         resource.readTime ? `<span class="text-gray-500 text-sm">${resource.readTime}</span>` : '';

    card.innerHTML = `
        <div class="flex items-start justify-between mb-4">
            <span class="category-badge category-${resource.category}">
                ${getCategoryDisplayName(resource.category)}
            </span>
            <div class="type-icon type-${resource.type}">
                <i class="${typeIcon} text-sm"></i>
            </div>
        </div>
        
        <h3 class="text-lg font-semibold text-gray-800 mb-3 line-clamp-2">${resource.title}</h3>
        
        <p class="text-gray-600 text-sm mb-4 line-clamp-3">${resource.description}</p>
        
        <div class="flex items-center justify-between">
            ${durationInfo}
            ${resource.featured ? `
                <span class="inline-flex items-center px-2 py-1 rounded-full text-xs bg-yellow-100 text-yellow-800">
                    <i class="fas fa-star mr-1"></i>Featured
                </span>
            ` : ''}
        </div>
    `;

    return card;
}

function filterResources() {
    const searchTerm = document.getElementById('searchResources').value.toLowerCase();
    const categoryFilter = document.getElementById('categoryFilter').value;
    const typeFilter = document.getElementById('typeFilter').value;
    const sortBy = document.getElementById('sortResources').value;

    let resources = JSON.parse(localStorage.getItem('resources')) || [];

    // Apply filters
    let filteredResources = resources.filter(resource => {
        const matchesSearch = resource.title.toLowerCase().includes(searchTerm) || 
                            resource.description.toLowerCase().includes(searchTerm);
        const matchesCategory = categoryFilter === 'all' || resource.category === categoryFilter;
        const matchesType = typeFilter === 'all' || resource.type === typeFilter;

        return matchesSearch && matchesCategory && matchesType;
    });

    // Apply sorting
    filteredResources.sort((a, b) => {
        switch(sortBy) {
            case 'newest':
                return b.id - a.id;
            case 'oldest':
                return a.id - b.id;
            case 'title':
                return a.title.localeCompare(b.title);
            case 'category':
                return a.category.localeCompare(b.category);
            default:
                return 0;
        }
    });

    // Display filtered resources
    displayFilteredResources(filteredResources);
}

function displayFilteredResources(resources) {
    const container = document.getElementById('resourcesContainer');
    const emptyState = document.getElementById('emptyState');

    if (resources.length === 0) {
        container.innerHTML = '';
        emptyState.classList.remove('hidden');
        return;
    }

    emptyState.classList.add('hidden');
    container.innerHTML = '';

    resources.forEach(resource => {
        const resourceCard = createResourceCard(resource);
        container.appendChild(resourceCard);
    });
}

function openResourceModal(resource) {
    const modalContent = document.getElementById('resourceModalContent');
    const externalLink = document.getElementById('resourceExternalLink');

    const typeIcon = getTypeIcon(resource.type);
    const durationInfo = resource.duration ? `
        <div class="flex items-center text-gray-600 mb-4">
            <i class="fas fa-clock mr-2"></i>
            <span>Duration: ${resource.duration}</span>
        </div>
    ` : resource.readTime ? `
        <div class="flex items-center text-gray-600 mb-4">
            <i class="fas fa-book-open mr-2"></i>
            <span>${resource.readTime}</span>
        </div>
    ` : '';

    modalContent.innerHTML = `
        <div class="flex items-start justify-between mb-6">
            <div>
                <span class="category-badge category-${resource.category} mb-2">
                    ${getCategoryDisplayName(resource.category)}
                </span>
                <h2 class="text-2xl font-bold text-gray-800">${resource.title}</h2>
            </div>
            <div class="type-icon type-${resource.type}">
                <i class="${typeIcon} text-sm"></i>
            </div>
        </div>

        ${durationInfo}

        <div class="prose max-w-none">
            <p class="text-gray-600 text-lg leading-relaxed mb-6">${resource.description}</p>
            
            <div class="bg-gray-50 rounded-lg p-4 mb-6">
                <h4 class="font-semibold text-gray-800 mb-2">Key Takeaways:</h4>
                <ul class="text-gray-600 space-y-1">
                    ${generateKeyTakeaways(resource.category)}
                </ul>
            </div>

            ${resource.featured ? `
                <div class="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-6">
                    <div class="flex items-center">
                        <i class="fas fa-star text-yellow-500 mr-2"></i>
                        <span class="font-semibold text-yellow-800">Featured Resource</span>
                    </div>
                    <p class="text-yellow-700 text-sm mt-1">This resource is specially curated for its exceptional value and relevance.</p>
                </div>
            ` : ''}
        </div>
    `;

    externalLink.href = resource.url;
    showModal('resourceModal');
}

function generateKeyTakeaways(category) {
    const takeawayMap = {
        'waste-reduction': [
            'Reduce food waste by up to 30%',
            'Save money on groceries',
            'Help protect the environment'
        ],
        'nutrition': [
            'Improve overall health',
            'Make informed food choices',
            'Balance nutritional intake'
        ],
        'budget-tips': [
            'Save money on food expenses',
            'Make smarter purchasing decisions',
            'Reduce unnecessary spending'
        ],
        'storage-tips': [
            'Extend food shelf life',
            'Maintain food quality',
            'Reduce spoilage and waste'
        ],
        'meal-planning': [
            'Save time on daily cooking',
            'Reduce last-minute decisions',
            'Ensure balanced meals'
        ],
        'sustainable-cooking': [
            'Reduce environmental impact',
            'Support local producers',
            'Practice mindful consumption'
        ]
    };

    const takeaways = takeawayMap[category] || [
        'Learn valuable food management skills',
        'Improve your sustainable practices',
        'Make positive lifestyle changes'
    ];

    return takeaways.map(takeaway => 
        `<li class="flex items-center">
            <i class="fas fa-check text-green-500 mr-2 text-xs"></i>
            ${takeaway}
        </li>`
    ).join('');
}

function updateResourceStatistics() {
    const resources = JSON.parse(localStorage.getItem('resources')) || [];
    
    const totalResources = resources.length;
    const wasteResources = resources.filter(r => r.category === 'waste-reduction').length;
    const nutritionResources = resources.filter(r => r.category === 'nutrition').length;
    const budgetResources = resources.filter(r => r.category === 'budget-tips').length;

    document.getElementById('totalResources').textContent = totalResources;
    document.getElementById('wasteResources').textContent = wasteResources;
    document.getElementById('nutritionResources').textContent = nutritionResources;
    document.getElementById('budgetResources').textContent = budgetResources;
}

// Utility Functions
function getTypeIcon(type) {
    const iconMap = {
        'article': 'fas fa-newspaper',
        'video': 'fas fa-play-circle',
        'guide': 'fas fa-book',
        'tip': 'fas fa-lightbulb'
    };
    return iconMap[type] || 'fas fa-file';
}

function getCategoryDisplayName(category) {
    const nameMap = {
        'waste-reduction': 'Waste Reduction',
        'nutrition': 'Nutrition',
        'budget-tips': 'Budget Tips',
        'storage-tips': 'Storage Tips',
        'meal-planning': 'Meal Planning',
        'sustainable-cooking': 'Sustainable Cooking'
    };
    return nameMap[category] || category;
}

function showModal(modalId) {
    const modal = document.getElementById(modalId);
    modal.classList.remove('hidden');
    modal.classList.add('modal-enter');
}

function hideModal(modalId) {
    const modal = document.getElementById(modalId);
    modal.classList.add('hidden');
}

// Add CSS for line clamping
const style = document.createElement('style');
style.textContent = `
    .line-clamp-2 {
        display: -webkit-box;
        -webkit-line-clamp: 2;
        -webkit-box-orient: vertical;
        overflow: hidden;
    }
    
    .line-clamp-3 {
        display: -webkit-box;
        -webkit-line-clamp: 3;
        -webkit-box-orient: vertical;
        overflow: hidden;
    }
    
    .prose {
        max-width: none;
    }
    
    .prose ul {
        list-style-type: none;
        padding-left: 0;
    }
`;
document.head.appendChild(style);