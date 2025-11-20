// Dashboard Tracking Logic & Recommendations
document.addEventListener('DOMContentLoaded', function() {
    // Initialize dashboard
    initializeDashboard();
    
    // Update data every 30 seconds
    setInterval(updateDashboard, 30000);
});

function initializeDashboard() {
    updateUserData();
    updateStatistics();
    updateRecentConsumption();
    updateCategoryBreakdown();
    updatePersonalizedRecommendations();
    updateWasteReductionTips();
    checkExpiringItems();
}

function updateUserData() {
    const userData = JSON.parse(localStorage.getItem('userData')) || {};
    document.getElementById('userName').textContent = userData.name || 'User';
}

function updateStatistics() {
    const inventory = JSON.parse(localStorage.getItem('inventory')) || [];
    const consumptionHistory = JSON.parse(localStorage.getItem('consumptionHistory')) || [];
    
    // Inventory Count
    const totalItems = inventory.reduce((sum, item) => sum + item.quantity, 0);
    document.getElementById('inventoryCount').textContent = totalItems;
    
    // Weekly Consumption
    const oneWeekAgo = new Date();
    oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);
    const weeklyConsumption = consumptionHistory.filter(entry => 
        new Date(entry.date) >= oneWeekAgo
    ).length;
    document.getElementById('weeklyConsumption').textContent = weeklyConsumption;
    
    // Expiring Items
    const expiringItems = inventory.filter(item => item.expirationDays <= 3).length;
    document.getElementById('expiringCount').textContent = expiringItems;
    
    // Money Saved (Estimate: $2 per prevented waste item)
    const moneySaved = expiringItems * 2;
    document.getElementById('moneySaved').textContent = `$${moneySaved}`;
    
    // Update trends
    updateTrendIndicators();
}

function updateTrendIndicators() {
    // Simple trend calculation based on recent activity
    const consumptionHistory = JSON.parse(localStorage.getItem('consumptionHistory')) || [];
    const inventory = JSON.parse(localStorage.getItem('inventory')) || [];
    
    // Consumption trend (compare last 7 days vs previous 7 days)
    const now = new Date();
    const lastWeekStart = new Date(now);
    lastWeekStart.setDate(now.getDate() - 7);
    
    const previousWeekStart = new Date(now);
    previousWeekStart.setDate(now.getDate() - 14);
    
    const lastWeekConsumption = consumptionHistory.filter(entry => 
        new Date(entry.date) >= lastWeekStart
    ).length;
    
    const previousWeekConsumption = consumptionHistory.filter(entry => 
        new Date(entry.date) >= previousWeekStart && new Date(entry.date) < lastWeekStart
    ).length;
    
    const consumptionTrend = document.getElementById('consumptionTrend');
    if (lastWeekConsumption > previousWeekConsumption) {
        consumptionTrend.innerHTML = '<i class="fas fa-arrow-up text-green-500 mr-1"></i> Increased';
        consumptionTrend.className = 'text-xs text-green-500 mt-1';
    } else if (lastWeekConsumption < previousWeekConsumption) {
        consumptionTrend.innerHTML = '<i class="fas fa-arrow-down text-red-500 mr-1"></i> Decreased';
        consumptionTrend.className = 'text-xs text-red-500 mt-1';
    } else {
        consumptionTrend.innerHTML = '<i class="fas fa-minus text-gray-500 mr-1"></i> Stable';
        consumptionTrend.className = 'text-xs text-gray-500 mt-1';
    }
    
    // Inventory trend
    const inventoryTrend = document.getElementById('inventoryTrend');
    const lastInventoryCount = localStorage.getItem('lastInventoryCount');
    const currentCount = inventory.reduce((sum, item) => sum + item.quantity, 0);
    
    if (lastInventoryCount) {
        if (currentCount > parseInt(lastInventoryCount)) {
            inventoryTrend.innerHTML = '<i class="fas fa-arrow-up text-green-500 mr-1"></i> More items';
            inventoryTrend.className = 'text-xs text-green-500 mt-1';
        } else if (currentCount < parseInt(lastInventoryCount)) {
            inventoryTrend.innerHTML = '<i class="fas fa-arrow-down text-red-500 mr-1"></i> Fewer items';
            inventoryTrend.className = 'text-xs text-red-500 mt-1';
        } else {
            inventoryTrend.innerHTML = '<i class="fas fa-minus text-gray-500 mr-1"></i> No change';
            inventoryTrend.className = 'text-xs text-gray-500 mt-1';
        }
    }
    
    localStorage.setItem('lastInventoryCount', currentCount);
}

function updateRecentConsumption() {
    const consumptionHistory = JSON.parse(localStorage.getItem('consumptionHistory')) || [];
    const container = document.getElementById('recentConsumption');
    
    if (consumptionHistory.length === 0) {
        container.innerHTML = `
            <div class="text-center py-8 text-gray-500">
                <i class="fas fa-utensils text-3xl mb-3 opacity-50"></i>
                <p>No consumption logged yet</p>
                <a href="profile.html#consumption" class="text-green-600 hover:text-green-700 text-sm font-medium mt-2 inline-block">
                    Log your first consumption →
                </a>
            </div>
        `;
        return;
    }
    
    // Get last 5 entries
    const recentEntries = consumptionHistory.slice(-5).reverse();
    container.innerHTML = '';
    
    recentEntries.forEach(entry => {
        const item = document.createElement('div');
        item.className = `consumption-item category-${entry.category}`;
        item.innerHTML = `
            <div class="flex items-center">
                <div class="w-10 h-10 rounded-full bg-white flex items-center justify-center mr-3">
                    <i class="fas fa-${getCategoryIcon(entry.category)} text-${getCategoryColor(entry.category)}-500"></i>
                </div>
                <div>
                    <div class="font-medium text-gray-900">${entry.item}</div>
                    <div class="text-sm text-gray-500">${entry.quantity} • ${formatDateTime(entry.date)}</div>
                </div>
            </div>
            <div class="text-right">
                <span class="category-badge bg-${getCategoryColor(entry.category)}-100 text-${getCategoryColor(entry.category)}-800">
                    ${entry.category}
                </span>
            </div>
        `;
        container.appendChild(item);
    });
}

function updateCategoryBreakdown() {
    const consumptionHistory = JSON.parse(localStorage.getItem('consumptionHistory')) || [];
    const container = document.getElementById('categoryBreakdown');
    
    // Count consumption by category
    const categoryCounts = {};
    consumptionHistory.forEach(entry => {
        categoryCounts[entry.category] = (categoryCounts[entry.category] || 0) + 1;
    });
    
    const categories = ['fruit', 'vegetable', 'dairy', 'meat', 'grains', 'beverages', 'snacks', 'condiments'];
    
    container.innerHTML = '';
    
    categories.forEach(category => {
        const count = categoryCounts[category] || 0;
        const percentage = consumptionHistory.length > 0 ? 
            Math.round((count / consumptionHistory.length) * 100) : 0;
        
        const card = document.createElement('div');
        card.className = 'text-center p-4 bg-gray-50 rounded-lg';
        card.innerHTML = `
            <div class="w-12 h-12 rounded-full bg-${getCategoryColor(category)}-100 flex items-center justify-center mx-auto mb-2">
                <i class="fas fa-${getCategoryIcon(category)} text-${getCategoryColor(category)}-600"></i>
            </div>
            <div class="text-sm font-medium text-gray-700 capitalize">${category}</div>
            <div class="text-lg font-bold text-${getCategoryColor(category)}-600">${percentage}%</div>
            <div class="text-xs text-gray-500">${count} items</div>
        `;
        container.appendChild(card);
    });
}

function updatePersonalizedRecommendations() {
    const consumptionHistory = JSON.parse(localStorage.getItem('consumptionHistory')) || [];
    const inventory = JSON.parse(localStorage.getItem('inventory')) || [];
    const userData = JSON.parse(localStorage.getItem('userData')) || {};
    const container = document.getElementById('personalizedRecommendations');
    
    const recommendations = generateRecommendations(consumptionHistory, inventory, userData);
    
    if (recommendations.length === 0) {
        container.innerHTML = `
            <div class="text-center py-4 text-gray-500">
                <i class="fas fa-info-circle text-xl mb-2 opacity-50"></i>
                <p class="text-sm">Log more consumption to get personalized recommendations</p>
            </div>
        `;
        return;
    }
    
    container.innerHTML = '';
    recommendations.forEach(rec => {
        const card = document.createElement('div');
        card.className = `recommendation-card border-${getCategoryColor(rec.relatedCategory)}-200 bg-${getCategoryColor(rec.relatedCategory)}-50`;
        card.innerHTML = `
            <div class="flex items-start justify-between mb-2">
                <h3 class="font-semibold text-gray-800 text-sm">${rec.title}</h3>
                <span class="recommendation-reason bg-${getCategoryColor(rec.relatedCategory)}-100 text-${getCategoryColor(rec.relatedCategory)}-800">
                    ${rec.relatedCategory}
                </span>
            </div>
            <p class="text-gray-600 text-xs mb-3">${rec.description}</p>
            <div class="flex justify-between items-center">
                <span class="text-${getCategoryColor(rec.relatedCategory)}-600 text-xs font-medium">
                    <i class="fas fa-${rec.icon} mr-1"></i>${rec.type}
                </span>
                <a href="${rec.url}" class="text-${getCategoryColor(rec.relatedCategory)}-600 hover:text-${getCategoryColor(rec.relatedCategory)}-700 text-xs font-medium">
                    Learn More →
                </a>
            </div>
        `;
        container.appendChild(card);
    });
}

function generateRecommendations(consumptionHistory, inventory, userData) {
    const recommendations = [];
    
    // Rule 1: Based on frequently consumed categories
    const categoryCounts = {};
    consumptionHistory.forEach(entry => {
        categoryCounts[entry.category] = (categoryCounts[entry.category] || 0) + 1;
    });
    
    const frequentCategories = Object.entries(categoryCounts)
        .sort((a, b) => b[1] - a[1])
        .slice(0, 2)
        .map(([category]) => category);
    
    // Add recommendations for frequent categories
    frequentCategories.forEach(category => {
        const categoryResources = getResourcesByCategory(category);
        recommendations.push(...categoryResources.slice(0, 1));
    });
    
    // Rule 2: Based on expiring items
    const expiringItems = inventory.filter(item => item.expirationDays <= 3);
    if (expiringItems.length > 0) {
        const expiringCategories = [...new Set(expiringItems.map(item => item.category))];
        expiringCategories.forEach(category => {
            recommendations.push({
                title: "Use Expiring Items Soon",
                description: `You have ${expiringItems.filter(item => item.category === category).length} ${category} items expiring soon. Check recipe ideas.`,
                type: "Waste Prevention",
                icon: "clock",
                relatedCategory: category,
                url: "resources.html?category=waste-reduction"
            });
        });
    }
    
    // Rule 3: Based on dietary preferences
    const dietaryPrefs = userData.dietaryPreferences || [];
    if (dietaryPrefs.includes('vegetarian') || dietaryPrefs.includes('vegan')) {
        recommendations.push({
            title: "Plant-Based Storage Tips",
            description: "Maximize freshness of your fruits and vegetables with proper storage techniques.",
            type: "Storage Guide",
            icon: "leaf",
            relatedCategory: "vegetable",
            url: "resources.html?category=storage-tips"
        });
    }
    
    // Rule 4: Based on consumption patterns (if heavy on one category)
    const totalConsumption = consumptionHistory.length;
    if (totalConsumption > 0) {
        Object.entries(categoryCounts).forEach(([category, count]) => {
            const percentage = (count / totalConsumption) * 100;
            if (percentage > 30) { // If more than 30% of consumption is one category
                recommendations.push({
                    title: `Diversify Your ${category.charAt(0).toUpperCase() + category.slice(1)} Intake`,
                    description: `Consider trying other food categories for balanced nutrition.`,
                    type: "Nutrition Tip",
                    icon: "balance-scale",
                    relatedCategory: category,
                    url: "resources.html?category=nutrition"
                });
            }
        });
    }
    
    // Rule 5: General waste reduction if user has inventory
    if (inventory.length > 10) {
        recommendations.push({
            title: "Smart Meal Planning",
            description: "Plan your meals around items you already have to reduce waste and save money.",
            type: "Planning Guide",
            icon: "calendar",
            relatedCategory: "general",
            url: "resources.html?category=meal-planning"
        });
    }
    
    // Remove duplicates and limit to 3 recommendations
    const uniqueRecs = [];
    const seenTitles = new Set();
    
    recommendations.forEach(rec => {
        if (!seenTitles.has(rec.title) && uniqueRecs.length < 3) {
            seenTitles.add(rec.title);
            uniqueRecs.push(rec);
        }
    });
    
    return uniqueRecs;
}

function updateWasteReductionTips() {
    const container = document.getElementById('wasteReductionTips');
    const tips = getWasteReductionTips();
    
    container.innerHTML = '';
    tips.forEach(tip => {
        const tipElement = document.createElement('div');
        tipElement.className = 'flex items-start p-3 bg-green-50 rounded-lg border border-green-200';
        tipElement.innerHTML = `
            <i class="fas fa-${tip.icon} text-green-500 mt-1 mr-3"></i>
            <div>
                <h4 class="font-medium text-green-800 text-sm">${tip.title}</h4>
                <p class="text-green-700 text-xs mt-1">${tip.description}</p>
            </div>
        `;
        container.appendChild(tipElement);
    });
}

function checkExpiringItems() {
    const inventory = JSON.parse(localStorage.getItem('inventory')) || [];
    const expiringItems = inventory.filter(item => item.expirationDays <= 3);
    
    const alertElement = document.getElementById('expiringAlert');
    const countElement = document.getElementById('expiringItemsCount');
    
    if (expiringItems.length > 0) {
        alertElement.classList.remove('hidden');
        countElement.textContent = expiringItems.length;
    } else {
        alertElement.classList.add('hidden');
    }
}

function getResourcesByCategory(category) {
    const resourceMap = {
        fruit: [
            {
                title: "Fruit Storage Guide",
                description: "Learn how to properly store different types of fruits to maximize freshness.",
                type: "Storage Tips",
                icon: "apple-alt",
                relatedCategory: "fruit",
                url: "resources.html?category=storage-tips"
            },
            {
                title: "Overripe Fruit Recipes",
                description: "Creative ways to use overripe fruits instead of throwing them away.",
                type: "Recipe Ideas",
                icon: "blender",
                relatedCategory: "fruit",
                url: "resources.html?category=recipes"
            }
        ],
        vegetable: [
            {
                title: "Vegetable Preservation",
                description: "Methods to preserve vegetables for longer shelf life.",
                type: "Preservation",
                icon: "carrot",
                relatedCategory: "vegetable",
                url: "resources.html?category=preservation"
            }
        ],
        dairy: [
            {
                title: "Dairy Storage Solutions",
                description: "Proper storage techniques for dairy products to prevent spoilage.",
                type: "Storage Guide",
                icon: "cheese",
                relatedCategory: "dairy",
                url: "resources.html?category=storage-tips"
            }
        ],
        meat: [
            {
                title: "Meat Freezing Tips",
                description: "Best practices for freezing and thawing meat safely.",
                type: "Safety Guide",
                icon: "drumstick-bite",
                relatedCategory: "meat",
                url: "resources.html?category=safety"
            }
        ],
        grains: [
            {
                title: "Grain Storage Methods",
                description: "Keep your grains fresh and pest-free with proper storage.",
                type: "Storage Tips",
                icon: "wheat-alt",
                relatedCategory: "grains",
                url: "resources.html?category=storage-tips"
            }
        ]
    };
    
    return resourceMap[category] || [
        {
            title: "General Food Storage",
            description: "Essential tips for storing all types of food items properly.",
            type: "Storage Guide",
            icon: "box",
            relatedCategory: category,
            url: "resources.html?category=storage-tips"
        }
    ];
}

function getWasteReductionTips() {
    return [
        {
            title: "First In, First Out",
            description: "Use older items before newer ones to prevent expiration.",
            icon: "sort-amount-down"
        },
        {
            title: "Proper Portioning",
            description: "Cook and serve appropriate portions to avoid leftovers.",
            icon: "weight"
        },
        {
            title: "Creative Leftovers",
            description: "Transform leftovers into new meals instead of discarding.",
            icon: "recycle"
        },
        {
            title: "Regular Inventory Checks",
            description: "Check your inventory weekly to track what you have.",
            icon: "clipboard-list"
        }
    ];
}

// Utility Functions
function getCategoryIcon(category) {
    const icons = {
        fruit: 'apple-alt',
        vegetable: 'carrot',
        dairy: 'cheese',
        meat: 'drumstick-bite',
        grains: 'wheat-alt',
        beverages: 'wine-bottle',
        snacks: 'cookie',
        condiments: 'wine-bottle'
    };
    return icons[category] || 'question';
}

function getCategoryColor(category) {
    const colors = {
        fruit: 'green',
        vegetable: 'green',
        dairy: 'yellow',
        meat: 'red',
        grains: 'amber',
        beverages: 'cyan',
        snacks: 'purple',
        condiments: 'pink'
    };
    return colors[category] || 'gray';
}

function formatDateTime(dateString) {
    const date = new Date(dateString);
    return date.toLocaleDateString() + ' ' + date.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'});
}

function updateDashboard() {
    updateStatistics();
    updateRecentConsumption();
    updateCategoryBreakdown();
    updatePersonalizedRecommendations();
    checkExpiringItems();
}

// Export functions for global access
window.dashboard = {
    refresh: updateDashboard,
    getRecommendations: generateRecommendations
};