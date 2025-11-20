// Food Inventory Management
document.addEventListener('DOMContentLoaded', function() {
    // Seed data for food items (15-20 common household foods)
    const seededFoodItems = [
        {
            id: 1,
            name: "Apple",
            category: "fruit",
            expirationDays: 14,
            costPerUnit: 0.5,
            quantity: 6,
            unit: "pieces",
            addedDate: new Date().toISOString(),
            notes: "Store in cool dry place"
        },
        {
            id: 2,
            name: "Banana",
            category: "fruit",
            expirationDays: 5,
            costPerUnit: 0.2,
            quantity: 8,
            unit: "pieces",
            addedDate: new Date().toISOString(),
            notes: "Ripens quickly at room temperature"
        },
        {
            id: 3,
            name: "Carrot",
            category: "vegetable",
            expirationDays: 21,
            costPerUnit: 0.3,
            quantity: 10,
            unit: "pieces",
            addedDate: new Date().toISOString(),
            notes: "Store in refrigerator"
        },
        {
            id: 4,
            name: "Broccoli",
            category: "vegetable",
            expirationDays: 7,
            costPerUnit: 1.2,
            quantity: 2,
            unit: "pieces",
            addedDate: new Date().toISOString(),
            notes: "Keep in crisper drawer"
        },
        {
            id: 5,
            name: "Milk",
            category: "dairy",
            expirationDays: 7,
            costPerUnit: 1.5,
            quantity: 1,
            unit: "liters",
            addedDate: new Date().toISOString(),
            notes: "Refrigerate immediately"
        },
        {
            id: 6,
            name: "Yogurt",
            category: "dairy",
            expirationDays: 14,
            costPerUnit: 0.8,
            quantity: 4,
            unit: "pieces",
            addedDate: new Date().toISOString(),
            notes: "Check expiration date"
        },
        {
            id: 7,
            name: "Chicken Breast",
            category: "meat",
            expirationDays: 3,
            costPerUnit: 4.5,
            quantity: 2,
            unit: "kg",
            addedDate: new Date().toISOString(),
            notes: "Freeze if not using within 2 days"
        },
        {
            id: 8,
            name: "Ground Beef",
            category: "meat",
            expirationDays: 2,
            costPerUnit: 6.0,
            quantity: 1,
            unit: "kg",
            addedDate: new Date().toISOString(),
            notes: "Use or freeze quickly"
        },
        {
            id: 9,
            name: "Rice",
            category: "grains",
            expirationDays: 365,
            costPerUnit: 2.0,
            quantity: 5,
            unit: "kg",
            addedDate: new Date().toISOString(),
            notes: "Store in airtight container"
        },
        {
            id: 10,
            name: "Pasta",
            category: "grains",
            expirationDays: 365,
            costPerUnit: 1.2,
            quantity: 3,
            unit: "pack",
            addedDate: new Date().toISOString(),
            notes: "Keep in dry place"
        },
        {
            id: 11,
            name: "Bread",
            category: "grains",
            expirationDays: 7,
            costPerUnit: 2.5,
            quantity: 2,
            unit: "pieces",
            addedDate: new Date().toISOString(),
            notes: "Freeze to extend life"
        },
        {
            id: 12,
            name: "Orange Juice",
            category: "beverages",
            expirationDays: 14,
            costPerUnit: 3.0,
            quantity: 1,
            unit: "liters",
            addedDate: new Date().toISOString(),
            notes: "Refrigerate after opening"
        },
        {
            id: 13,
            name: "Coffee",
            category: "beverages",
            expirationDays: 180,
            costPerUnit: 8.0,
            quantity: 1,
            unit: "pack",
            addedDate: new Date().toISOString(),
            notes: "Store in airtight container"
        },
        {
            id: 14,
            name: "Potato Chips",
            category: "snacks",
            expirationDays: 90,
            costPerUnit: 2.5,
            quantity: 3,
            unit: "pack",
            addedDate: new Date().toISOString(),
            notes: "Reseal bag after opening"
        },
        {
            id: 15,
            name: "Ketchup",
            category: "condiments",
            expirationDays: 180,
            costPerUnit: 3.5,
            quantity: 1,
            unit: "bottle",
            addedDate: new Date().toISOString(),
            notes: "Refrigerate after opening"
        },
        {
            id: 16,
            name: "Eggs",
            category: "dairy",
            expirationDays: 28,
            costPerUnit: 0.25,
            quantity: 12,
            unit: "pieces",
            addedDate: new Date().toISOString(),
            notes: "Store in refrigerator"
        },
        {
            id: 17,
            name: "Tomato",
            category: "vegetable",
            expirationDays: 7,
            costPerUnit: 0.4,
            quantity: 5,
            unit: "pieces",
            addedDate: new Date().toISOString(),
            notes: "Store at room temperature"
        },
        {
            id: 18,
            name: "Cheese",
            category: "dairy",
            expirationDays: 21,
            costPerUnit: 5.0,
            quantity: 1,
            unit: "pack",
            addedDate: new Date().toISOString(),
            notes: "Keep wrapped in refrigerator"
        },
        {
            id: 19,
            name: "Onion",
            category: "vegetable",
            expirationDays: 30,
            costPerUnit: 0.3,
            quantity: 4,
            unit: "pieces",
            addedDate: new Date().toISOString(),
            notes: "Store in cool dark place"
        },
        {
            id: 20,
            name: "Cereal",
            category: "grains",
            expirationDays: 180,
            costPerUnit: 4.0,
            quantity: 2,
            unit: "box",
            addedDate: new Date().toISOString(),
            notes: "Keep sealed after opening"
        }
    ];

    let inventory = JSON.parse(localStorage.getItem('inventory')) || seededFoodItems;
    let filteredInventory = [...inventory];

    // Initialize the page
    initializeInventory();

    // Event Listeners
    document.getElementById('addNewItemBtn').addEventListener('click', showAddItemModal);
    document.getElementById('addFirstItemBtn').addEventListener('click', showAddItemModal);
    document.getElementById('cancelAddItem').addEventListener('click', () => hideModal('addItemModal'));
    document.getElementById('closeItemDetails').addEventListener('click', () => hideModal('itemDetailsModal'));
    document.getElementById('addItemForm').addEventListener('submit', addNewItem);
    
    // Filter Event Listeners
    document.getElementById('searchInventory').addEventListener('input', filterInventory);
    document.getElementById('categoryFilter').addEventListener('change', filterInventory);
    document.getElementById('expirationFilter').addEventListener('change', filterInventory);

    function initializeInventory() {
        updateInventoryTable();
        updateStatistics();
        updateCategoryCounts();
    }

    function updateInventoryTable() {
        const tbody = document.getElementById('inventoryTableBody');
        const emptyState = document.getElementById('emptyState');
        
        tbody.innerHTML = '';

        if (filteredInventory.length === 0) {
            tbody.classList.add('hidden');
            emptyState.classList.remove('hidden');
            return;
        }

        tbody.classList.remove('hidden');
        emptyState.classList.add('hidden');

        filteredInventory.forEach(item => {
            const row = document.createElement('tr');
            row.className = `category-${item.category}`;
            
            const status = getExpirationStatus(item.expirationDays);
            const statusClass = `status-${status}`;
            const statusText = getStatusText(status, item.expirationDays);
            
            row.innerHTML = `
                <td class="px-6 py-4 whitespace-nowrap">
                    <div class="flex items-center">
                        <div class="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center mr-3">
                            <i class="fas fa-${getCategoryIcon(item.category)} text-${getCategoryColor(item.category)}-500"></i>
                        </div>
                        <div>
                            <div class="font-medium text-gray-900">${item.name}</div>
                            <div class="text-sm text-gray-500">${item.quantity} ${item.unit}</div>
                        </div>
                    </div>
                </td>
                <td class="px-6 py-4 whitespace-nowrap">
                    <span class="category-badge ${statusClass}">${item.category}</span>
                </td>
                <td class="px-6 py-4 whitespace-nowrap">
                    <div class="text-sm text-gray-900">${item.expirationDays} days</div>
                    <div class="text-xs text-gray-500">${statusText}</div>
                </td>
                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    $${(item.costPerUnit * item.quantity).toFixed(2)}
                </td>
                <td class="px-6 py-4 whitespace-nowrap">
                    <span class="status-badge ${statusClass}">
                        <i class="fas fa-${getStatusIcon(status)} mr-1"></i>
                        ${statusText}
                    </span>
                </td>
                <td class="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <div class="flex space-x-2">
                        <button onclick="viewItemDetails(${item.id})" 
                                class="text-blue-600 hover:text-blue-900 transition-colors"
                                title="View Details">
                            <i class="fas fa-eye"></i>
                        </button>
                        <button onclick="useInventoryItem(${item.id})" 
                                class="text-green-600 hover:text-green-900 transition-colors"
                                title="Use Item">
                            <i class="fas fa-utensils"></i>
                        </button>
                        <button onclick="removeInventoryItem(${item.id})" 
                                class="text-red-600 hover:text-red-900 transition-colors"
                                title="Remove Item">
                            <i class="fas fa-trash"></i>
                        </button>
                    </div>
                </td>
            `;
            tbody.appendChild(row);
        });
    }

    function updateStatistics() {
        const totalItems = inventory.reduce((sum, item) => sum + item.quantity, 0);
        const expiringSoon = inventory.filter(item => item.expirationDays <= 3).length;
        const categories = new Set(inventory.map(item => item.category)).size;
        const totalValue = inventory.reduce((sum, item) => sum + (item.costPerUnit * item.quantity), 0);

        document.getElementById('totalItemsCount').textContent = totalItems;
        document.getElementById('expiringSoonCount').textContent = expiringSoon;
        document.getElementById('categoriesCount').textContent = categories;
        document.getElementById('totalValue').textContent = `$${totalValue.toFixed(2)}`;
    }

    function updateCategoryCounts() {
        const produceCount = inventory.filter(item => ['fruit', 'vegetable'].includes(item.category)).length;
        const dairyCount = inventory.filter(item => item.category === 'dairy').length;
        const meatCount = inventory.filter(item => item.category === 'meat').length;
        const grainsCount = inventory.filter(item => item.category === 'grains').length;

        document.getElementById('produceCount').textContent = `${produceCount} items`;
        document.getElementById('dairyCount').textContent = `${dairyCount} items`;
        document.getElementById('meatCount').textContent = `${meatCount} items`;
        document.getElementById('grainsCount').textContent = `${grainsCount} items`;
    }

    function filterInventory() {
        const searchTerm = document.getElementById('searchInventory').value.toLowerCase();
        const categoryFilter = document.getElementById('categoryFilter').value;
        const expirationFilter = document.getElementById('expirationFilter').value;

        filteredInventory = inventory.filter(item => {
            // Search filter
            const matchesSearch = item.name.toLowerCase().includes(searchTerm);
            
            // Category filter
            const matchesCategory = categoryFilter === 'all' || item.category === categoryFilter;
            
            // Expiration filter
            let matchesExpiration = true;
            if (expirationFilter === 'expiring') {
                matchesExpiration = item.expirationDays <= 3;
            } else if (expirationFilter === 'fresh') {
                matchesExpiration = item.expirationDays > 7;
            } else if (expirationFilter === 'expired') {
                matchesExpiration = item.expirationDays <= 0;
            }
            
            return matchesSearch && matchesCategory && matchesExpiration;
        });

        updateInventoryTable();
    }

    function showAddItemModal() {
        document.getElementById('addItemForm').reset();
        showModal('addItemModal');
    }

    function addNewItem(e) {
        e.preventDefault();
        
        const newItem = {
            id: Date.now(), // Simple ID generation
            name: document.getElementById('itemName').value,
            category: document.getElementById('itemCategory').value,
            expirationDays: parseInt(document.getElementById('itemExpiration').value),
            costPerUnit: parseFloat(document.getElementById('itemCost').value),
            quantity: parseInt(document.getElementById('itemQuantity').value) || 1,
            unit: document.getElementById('itemUnit').value,
            notes: document.getElementById('itemNotes').value,
            addedDate: new Date().toISOString()
        };
        
        inventory.push(newItem);
        saveInventory();
        filterInventory(); // Update filtered view
        updateStatistics();
        updateCategoryCounts();
        hideModal('addItemModal');
        
        showSuccessMessage('Item added to inventory successfully!');
    }

    // Global functions for button clicks
    window.viewItemDetails = function(itemId) {
        const item = inventory.find(i => i.id === itemId);
        if (!item) return;
        
        const content = document.getElementById('itemDetailsContent');
        const status = getExpirationStatus(item.expirationDays);
        
        content.innerHTML = `
            <div class="text-center mb-6">
                <div class="w-16 h-16 rounded-full bg-gray-100 flex items-center justify-center mx-auto mb-3">
                    <i class="fas fa-${getCategoryIcon(item.category)} text-${getCategoryColor(item.category)}-500 text-2xl"></i>
                </div>
                <h3 class="text-xl font-semibold text-gray-800">${item.name}</h3>
                <p class="text-gray-500">${item.category}</p>
            </div>
            
            <div class="space-y-3">
                <div class="flex justify-between">
                    <span class="text-gray-600">Quantity:</span>
                    <span class="font-medium">${item.quantity} ${item.unit}</span>
                </div>
                <div class="flex justify-between">
                    <span class="text-gray-600">Expires In:</span>
                    <span class="font-medium ${status === 'expired' ? 'text-red-600' : status === 'warning' ? 'text-orange-600' : 'text-green-600'}">
                        ${item.expirationDays} days
                    </span>
                </div>
                <div class="flex justify-between">
                    <span class="text-gray-600">Cost:</span>
                    <span class="font-medium">$${(item.costPerUnit * item.quantity).toFixed(2)}</span>
                </div>
                <div class="flex justify-between">
                    <span class="text-gray-600">Added:</span>
                    <span class="font-medium">${new Date(item.addedDate).toLocaleDateString()}</span>
                </div>
                ${item.notes ? `
                <div class="border-t pt-3 mt-3">
                    <span class="text-gray-600 block mb-1">Storage Notes:</span>
                    <p class="text-sm text-gray-700">${item.notes}</p>
                </div>
                ` : ''}
            </div>
        `;
        
        // Set up use item button
        document.getElementById('useItemBtn').onclick = () => useInventoryItem(itemId);
        
        showModal('itemDetailsModal');
    };

    window.useInventoryItem = function(itemId) {
        const item = inventory.find(i => i.id === itemId);
        if (!item) return;
        
        // For now, just remove the item
        // In a real app, you might want to log this as consumption
        if (confirm(`Use ${item.name}? This will remove it from inventory.`)) {
            removeInventoryItem(itemId);
            showSuccessMessage(`${item.name} has been used and removed from inventory.`);
        }
    };

    window.removeInventoryItem = function(itemId) {
        if (confirm('Are you sure you want to remove this item from inventory?')) {
            inventory = inventory.filter(item => item.id !== itemId);
            saveInventory();
            filterInventory();
            updateStatistics();
            updateCategoryCounts();
            showSuccessMessage('Item removed from inventory.');
        }
    };

    function saveInventory() {
        localStorage.setItem('inventory', JSON.stringify(inventory));
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

    function showSuccessMessage(message) {
        // Create temporary success message
        const successDiv = document.createElement('div');
        successDiv.className = 'fixed top-20 right-4 bg-green-500 text-white px-6 py-3 rounded-lg shadow-lg z-50';
        successDiv.innerHTML = `
            <div class="flex items-center">
                <i class="fas fa-check-circle mr-2"></i>
                <span>${message}</span>
            </div>
        `;
        
        document.body.appendChild(successDiv);
        
        setTimeout(() => {
            successDiv.remove();
        }, 3000);
    }

    // Utility Functions
    function getExpirationStatus(days) {
        if (days <= 0) return 'expired';
        if (days <= 3) return 'warning';
        return 'fresh';
    }

    function getStatusText(status, days) {
        switch(status) {
            case 'expired': return 'Expired';
            case 'warning': return 'Expiring Soon';
            case 'fresh': return days > 7 ? 'Fresh' : 'Good';
            default: return 'Unknown';
        }
    }

    function getStatusIcon(status) {
        switch(status) {
            case 'expired': return 'exclamation-triangle';
            case 'warning': return 'clock';
            case 'fresh': return 'check-circle';
            default: return 'question';
        }
    }

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
});