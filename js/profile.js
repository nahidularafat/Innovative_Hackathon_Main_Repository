// Profile Page Functionality
document.addEventListener('DOMContentLoaded', function() {
    // Initialize data
    let userData = JSON.parse(localStorage.getItem('userData')) || {
        name: 'John Doe',
        email: 'john@example.com',
        budget: 150,
        dietaryPreferences: ['vegetarian'],
        inventory: [],
        consumptionHistory: []
    };

    let inventory = userData.inventory || [];
    let consumptionHistory = userData.consumptionHistory || [];

    // Initialize the page
    initializePage();

    // Modal Elements
    const editProfileModal = document.getElementById('editProfileModal');
    const addInventoryModal = document.getElementById('addInventoryModal');
    const dietaryModal = document.getElementById('dietaryModal');

    // Event Listeners
    document.getElementById('editProfileBtn').addEventListener('click', showEditProfileModal);
    document.getElementById('editDietaryBtn').addEventListener('click', showDietaryModal);
    document.getElementById('addItemBtn').addEventListener('click', showAddInventoryModal);
    document.getElementById('logConsumptionBtn').addEventListener('click', scrollToConsumption);
    document.getElementById('viewHistoryBtn').addEventListener('click', scrollToHistory);

    // Form Submissions
    document.getElementById('profileForm').addEventListener('submit', saveProfile);
    document.getElementById('dietaryForm').addEventListener('submit', saveDietaryPreferences);
    document.getElementById('inventoryForm').addEventListener('submit', addInventoryItem);
    document.getElementById('consumptionForm').addEventListener('submit', logConsumption);

    // Modal Close Buttons
    document.getElementById('cancelProfileEdit').addEventListener('click', () => hideModal(editProfileModal));
    document.getElementById('cancelDietary').addEventListener('click', () => hideModal(dietaryModal));
    document.getElementById('cancelInventory').addEventListener('click', () => hideModal(addInventoryModal));

    // Close modals on outside click
    [editProfileModal, addInventoryModal, dietaryModal].forEach(modal => {
        modal.addEventListener('click', (e) => {
            if (e.target === modal) hideModal(modal);
        });
    });

    function initializePage() {
        updateUserProfile();
        updateDietaryPreferences();
        updateInventoryTable();
        updateConsumptionHistory();
        updateQuickStats();
        
        // Set current date-time for consumption form
        document.getElementById('consumptionDate').value = getCurrentDateTime();
    }

    function updateUserProfile() {
        document.getElementById('userName').textContent = userData.name;
        document.getElementById('userEmail').textContent = userData.email;
        document.getElementById('editUserName').value = userData.name;
        document.getElementById('editUserEmail').value = userData.email;
        document.getElementById('editUserBudget').value = userData.budget || 150;
    }

    function updateDietaryPreferences() {
        const container = document.getElementById('dietaryPrefsList');
        container.innerHTML = '';

        if (userData.dietaryPreferences && userData.dietaryPreferences.length > 0) {
            userData.dietaryPreferences.forEach(pref => {
                const badge = document.createElement('div');
                badge.className = 'inline-flex items-center px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm mr-2 mb-2';
                badge.innerHTML = `<i class="fas fa-check mr-1"></i>${pref}`;
                container.appendChild(badge);
            });
        } else {
            container.innerHTML = '<p class="text-gray-500 text-sm">No dietary preferences set</p>';
        }

        // Update dietary form checkboxes
        const checkboxes = document.querySelectorAll('input[name="dietary"]');
        checkboxes.forEach(checkbox => {
            checkbox.checked = userData.dietaryPreferences?.includes(checkbox.value) || false;
        });
    }

    function updateInventoryTable() {
        const tbody = document.getElementById('inventoryTableBody');
        tbody.innerHTML = '';

        if (inventory.length === 0) {
            tbody.innerHTML = `
                <tr>
                    <td colspan="5" class="px-4 py-8 text-center text-gray-500">
                        <i class="fas fa-box-open text-3xl mb-2 opacity-50"></i>
                        <p>No items in inventory</p>
                    </td>
                </tr>
            `;
            return;
        }

        inventory.forEach((item, index) => {
            const row = document.createElement('tr');
            row.className = 'inventory-item';
            row.innerHTML = `
                <td class="px-4 py-3 whitespace-nowrap">
                    <div class="font-medium text-gray-900">${item.name}</div>
                </td>
                <td class="px-4 py-3 whitespace-nowrap">
                    <span class="category-badge ${item.category}">${item.category}</span>
                </td>
                <td class="px-4 py-3 whitespace-nowrap">
                    <span class="font-medium">${item.quantity} ${item.unit}</span>
                </td>
                <td class="px-4 py-3 whitespace-nowrap text-sm text-gray-500">
                    ${formatDate(item.addedDate)}
                </td>
                <td class="px-4 py-3 whitespace-nowrap text-sm">
                    <button onclick="removeInventoryItem(${index})" class="text-red-600 hover:text-red-900 transition-colors">
                        <i class="fas fa-trash"></i>
                    </button>
                </td>
            `;
            tbody.appendChild(row);
        });
    }

    function updateConsumptionHistory() {
        const container = document.getElementById('consumptionHistory');
        container.innerHTML = '';

        if (consumptionHistory.length === 0) {
            container.innerHTML = `
                <div class="empty-state">
                    <i class="fas fa-utensils"></i>
                    <p>No consumption history yet</p>
                </div>
            `;
            return;
        }

        // Show last 10 entries
        const recentHistory = consumptionHistory.slice(-10).reverse();
        
        recentHistory.forEach(entry => {
            const item = document.createElement('div');
            item.className = `consumption-item ${entry.category}`;
            item.innerHTML = `
                <div class="flex items-center">
                    <div class="w-10 h-10 rounded-full bg-white flex items-center justify-center mr-3">
                        <i class="fas fa-${getCategoryIcon(entry.category)} text-${getCategoryColor(entry.category)}-500"></i>
                    </div>
                    <div>
                        <div class="font-medium">${entry.item}</div>
                        <div class="text-sm text-gray-500">${entry.quantity} • ${formatDateTime(entry.date)}</div>
                    </div>
                </div>
                <div class="text-right">
                    <div class="text-sm text-gray-500">${entry.category}</div>
                    ${entry.notes ? `<div class="text-xs text-gray-400 mt-1">${entry.notes}</div>` : ''}
                </div>
            `;
            container.appendChild(item);
        });
    }

    function updateQuickStats() {
        document.getElementById('totalItems').textContent = inventory.length;
        
        const today = new Date().toDateString();
        const consumedToday = consumptionHistory.filter(entry => 
            new Date(entry.date).toDateString() === today
        ).length;
        document.getElementById('consumedToday').textContent = consumedToday;
    }

    // Modal Functions
    function showEditProfileModal() {
        showModal(editProfileModal);
    }

    function showDietaryModal() {
        showModal(dietaryModal);
    }

    function showAddInventoryModal() {
        showModal(addInventoryModal);
    }

    function showModal(modal) {
        modal.classList.remove('hidden');
        modal.classList.add('modal-enter');
    }

    function hideModal(modal) {
        modal.classList.add('hidden');
    }

    // Form Handlers
    function saveProfile(e) {
        e.preventDefault();
        
        userData.name = document.getElementById('editUserName').value;
        userData.email = document.getElementById('editUserEmail').value;
        userData.budget = parseFloat(document.getElementById('editUserBudget').value);
        
        saveUserData();
        updateUserProfile();
        hideModal(editProfileModal);
        
        showSuccessMessage('Profile updated successfully!');
    }

    function saveDietaryPreferences(e) {
        e.preventDefault();
        
        const selectedPreferences = Array.from(document.querySelectorAll('input[name="dietary"]:checked'))
            .map(checkbox => checkbox.value);
        
        userData.dietaryPreferences = selectedPreferences;
        saveUserData();
        updateDietaryPreferences();
        hideModal(dietaryModal);
        
        showSuccessMessage('Dietary preferences updated!');
    }

    function addInventoryItem(e) {
        e.preventDefault();
        
        const newItem = {
            name: document.getElementById('inventoryItemName').value,
            category: document.getElementById('inventoryCategory').value,
            quantity: parseFloat(document.getElementById('inventoryQuantity').value),
            unit: document.getElementById('inventoryUnit').value,
            addedDate: new Date().toISOString()
        };
        
        inventory.push(newItem);
        userData.inventory = inventory;
        saveUserData();
        updateInventoryTable();
        updateQuickStats();
        hideModal(addInventoryModal);
        document.getElementById('inventoryForm').reset();
        
        showSuccessMessage('Item added to inventory!');
    }

    function logConsumption(e) {
        e.preventDefault();
        
        const newConsumption = {
            item: document.getElementById('foodItem').value,
            quantity: document.getElementById('foodQuantity').value,
            category: document.getElementById('foodCategory').value,
            date: document.getElementById('consumptionDate').value,
            notes: document.getElementById('consumptionNotes').value,
            loggedAt: new Date().toISOString()
        };
        
        consumptionHistory.push(newConsumption);
        userData.consumptionHistory = consumptionHistory;
        saveUserData();
        updateConsumptionHistory();
        updateQuickStats();
        document.getElementById('consumptionForm').reset();
        document.getElementById('consumptionDate').value = getCurrentDateTime();
        
        showSuccessMessage('Consumption logged successfully!');
    }

    // Utility Functions
    function saveUserData() {
        localStorage.setItem('userData', JSON.stringify(userData));
    }

    function getCurrentDateTime() {
        const now = new Date();
        now.setMinutes(now.getMinutes() - now.getTimezoneOffset());
        return now.toISOString().slice(0, 16);
    }

    function formatDate(dateString) {
        return new Date(dateString).toLocaleDateString();
    }

    function formatDateTime(dateString) {
        return new Date(dateString).toLocaleString();
    }

    function getCategoryIcon(category) {
        const icons = {
            vegetable: 'carrot',
            fruit: 'apple-alt',
            dairy: 'cheese',
            meat: 'drumstick-bite',
            grains: 'bread-slice',
            beverages: 'wine-bottle',
            other: 'question'
        };
        return icons[category] || 'question';
    }

    function getCategoryColor(category) {
        const colors = {
            vegetable: 'green',
            fruit: 'yellow',
            dairy: 'blue',
            meat: 'red',
            grains: 'amber',
            beverages: 'cyan',
            other: 'gray'
        };
        return colors[category] || 'gray';
    }

    function showSuccessMessage(message) {
        // Create temporary success message
        const successDiv = document.createElement('div');
        successDiv.className = 'fixed top-20 right-4 bg-green-500 text-white px-6 py-3 rounded-lg shadow-lg z-50 success-message';
        successDiv.innerHTML = `
            <div class="flex items-center">
                <i class="fas fa-check-circle mr-2"></i>
                <span>${message}</span>
            </div>
        `;
        
       