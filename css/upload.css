// Image Upload and Management System
document.addEventListener('DOMContentLoaded', function() {
    // Initialize upload system
    initializeUploadSystem();
    loadRecentUploads();
    updateUploadStatistics();
    populateAssociationDropdowns();

    // Event Listeners
    document.getElementById('browseButton').addEventListener('click', triggerFileInput);
    document.getElementById('fileInput').addEventListener('change', handleFileSelect);
    document.getElementById('removeImage').addEventListener('click', removeSelectedImage);
    document.getElementById('saveImageBtn').addEventListener('click', saveImage);
    document.getElementById('associateImageBtn').addEventListener('click', showAssociationModal);
    document.getElementById('createAssociationBtn').addEventListener('click', createQuickAssociation);
    document.getElementById('cancelAssociation').addEventListener('click', () => hideModal('associationModal'));
    document.getElementById('confirmAssociation').addEventListener('click', confirmAssociation);
    document.getElementById('closeGallery').addEventListener('click', () => hideModal('galleryModal'));

    // Drag and drop functionality
    setupDragAndDrop();
});

function initializeUploadSystem() {
    // Set current date-time for upload
    document.getElementById('uploadDate').value = getCurrentDateTime();
}

function setupDragAndDrop() {
    const uploadArea = document.getElementById('uploadArea');
    const fileInput = document.getElementById('fileInput');

    // Prevent default drag behaviors
    ['dragenter', 'dragover', 'dragleave', 'drop'].forEach(eventName => {
        uploadArea.addEventListener(eventName, preventDefaults, false);
        document.body.addEventListener(eventName, preventDefaults, false);
    });

    // Highlight drop area when item is dragged over it
    ['dragenter', 'dragover'].forEach(eventName => {
        uploadArea.addEventListener(eventName, highlight, false);
    });

    ['dragleave', 'drop'].forEach(eventName => {
        uploadArea.addEventListener(eventName, unhighlight, false);
    });

    // Handle dropped files
    uploadArea.addEventListener('drop', handleDrop, false);

    function preventDefaults(e) {
        e.preventDefault();
        e.stopPropagation();
    }

    function highlight() {
        uploadArea.classList.add('dragover');
    }

    function unhighlight() {
        uploadArea.classList.remove('dragover');
    }

    function handleDrop(e) {
        const dt = e.dataTransfer;
        const files = dt.files;
        handleFiles(files);
    }
}

function triggerFileInput() {
    document.getElementById('fileInput').click();
}

function handleFileSelect(e) {
    const files = e.target.files;
    handleFiles(files);
}

function handleFiles(files) {
    if (files.length === 0) return;

    const file = files[0];
    
    // Validate file type
    if (!validateFileType(file)) {
        showError('Please select a JPG, PNG, or WebP image file.');
        return;
    }

    // Validate file size (5MB limit)
    if (!validateFileSize(file)) {
        showError('File size must be less than 5MB.');
        return;
    }

    // Show upload progress
    showUploadProgress();

    // Simulate upload progress
    simulateUploadProgress(() => {
        // After "upload", show preview
        showImagePreview(file);
    });
}

function validateFileType(file) {
    const acceptedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp'];
    return acceptedTypes.includes(file.type);
}

function validateFileSize(file) {
    const maxSize = 5 * 1024 * 1024; // 5MB in bytes
    return file.size <= maxSize;
}

function simulateUploadProgress(callback) {
    const progressBar = document.getElementById('progressBar');
    const progressPercent = document.getElementById('progressPercent');
    let progress = 0;

    const interval = setInterval(() => {
        progress += Math.random() * 15;
        if (progress >= 100) {
            progress = 100;
            clearInterval(interval);
            setTimeout(callback, 300);
        }

        progressBar.style.width = progress + '%';
        progressPercent.textContent = Math.round(progress) + '%';
    }, 100);
}

function showUploadProgress() {
    document.getElementById('uploadProgress').classList.remove('hidden');
    document.getElementById('uploadArea').classList.add('has-image');
}

function hideUploadProgress() {
    document.getElementById('uploadProgress').classList.add('hidden');
}

function showImagePreview(file) {
    const reader = new FileReader();
    
    reader.onload = function(e) {
        const previewImage = document.getElementById('previewImage');
        const fileName = document.getElementById('fileName');
        
        previewImage.src = e.target.result;
        fileName.textContent = file.name;
        
        // Show preview and details form
        document.getElementById('imagePreview').classList.remove('hidden');
        document.getElementById('imageDetailsForm').classList.remove('hidden');
        document.getElementById('actionButtons').classList.remove('hidden');
        
        // Hide upload progress
        hideUploadProgress();
    };
    
    reader.readAsDataURL(file);
}

function removeSelectedImage() {
    // Reset everything
    document.getElementById('fileInput').value = '';
    document.getElementById('previewImage').src = '';
    document.getElementById('imagePreview').classList.add('hidden');
    document.getElementById('imageDetailsForm').classList.add('hidden');
    document.getElementById('actionButtons').classList.add('hidden');
    document.getElementById('uploadArea').classList.remove('has-image');
    hideUploadProgress();
}

function saveImage() {
    const fileInput = document.getElementById('fileInput');
    if (!fileInput.files[0]) {
        showError('Please select an image first.');
        return;
    }

    const imageData = {
        id: Date.now(),
        name: fileInput.files[0].name,
        type: document.getElementById('imageType').value,
        description: document.getElementById('imageDescription').value,
        uploadDate: document.getElementById('uploadDate').value || getCurrentDateTime(),
        associatedWith: null,
        imageUrl: document.getElementById('previewImage').src // Data URL for demo
    };

    // Save to localStorage
    const uploads = JSON.parse(localStorage.getItem('imageUploads')) || [];
    uploads.push(imageData);
    localStorage.setItem('imageUploads', JSON.stringify(uploads));

    // Reset form and show success
    removeSelectedImage();
    loadRecentUploads();
    updateUploadStatistics();
    
    showSuccess('Image uploaded successfully!');
}

function showAssociationModal() {
    const fileInput = document.getElementById('fileInput');
    if (!fileInput.files[0]) {
        showError('Please select an image first.');
        return;
    }

    const content = document.getElementById('associationContent');
    content.innerHTML = `
        <div class="space-y-4">
            <div class="text-center mb-4">
                <img src="${document.getElementById('previewImage').src}" 
                     class="max-w-full max-h-32 mx-auto rounded-lg mb-2" alt="Image to associate">
                <p class="text-sm text-gray-600">${fileInput.files[0].name}</p>
            </div>
            
            <div>
                <label class="block text-sm font-medium text-gray-700 mb-2">Associate With</label>
                <select id="associationTarget" class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500">
                    <option value="">Select target...</option>
                    <optgroup label="Inventory Items">
                        ${getInventoryOptions()}
                    </optgroup>
                    <optgroup label="Consumption Logs">
                        ${getConsumptionOptions()}
                    </optgroup>
                </select>
            </div>
            
            <div>
                <label class="block text-sm font-medium text-gray-700 mb-2">Association Type</label>
                <select id="associationType" class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500">
                    <option value="receipt">Receipt for purchase</option>
                    <option value="nutrition">Nutrition information</option>
                    <option value="ingredients">Ingredient list</option>
                    <option value="storage">Storage instructions</option>
                    <option value="other">Other</option>
                </select>
            </div>
            
            <div>
                <label class="block text-sm font-medium text-gray-700 mb-2">Notes (Optional)</label>
                <textarea id="associationNotes" 
                          class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                          placeholder="Add any notes about this association..."
                          rows="2"></textarea>
            </div>
        </div>
    `;

    showModal('associationModal');
}

function confirmAssociation() {
    const target = document.getElementById('associationTarget').value;
    const type = document.getElementById('associationType').value;
    const notes = document.getElementById('associationNotes').value;

    if (!target) {
        showError('Please select an item to associate with.');
        return;
    }

    // In a real app, you would save this association to your database
    // For demo, we'll just show a success message
    showSuccess(`Image associated with ${target.split('|')[1]} successfully!`);
    hideModal('associationModal');
}

function createQuickAssociation() {
    const inventorySelect = document.getElementById('inventoryAssociation');
    const consumptionSelect = document.getElementById('consumptionAssociation');
    
    const inventoryValue = inventorySelect.value;
    const consumptionValue = consumptionSelect.value;

    if (!inventoryValue && !consumptionValue) {
        showError('Please select an item to associate with.');
        return;
    }

    const target = inventoryValue || consumptionValue;
    showSuccess(`Quick association created for ${target.split('|')[1]}!`);
    
    // Reset selects
    inventorySelect.value = '';
    consumptionSelect.value = '';
}

function loadRecentUploads() {
    const uploads = JSON.parse(localStorage.getItem('imageUploads')) || [];
    const container = document.getElementById('recentUploads');

    if (uploads.length === 0) {
        container.innerHTML = `
            <div class="text-center py-8 text-gray-500">
                <i class="fas fa-images text-3xl mb-3 opacity-50"></i>
                <p>No images uploaded yet</p>
                <p class="text-sm mt-1">Upload your first receipt or food label</p>
            </div>
        `;
        return;
    }

    // Show last 6 uploads
    const recentUploads = uploads.slice(-6).reverse();
    container.innerHTML = '';

    recentUploads.forEach(upload => {
        const uploadElement = document.createElement('div');
        uploadElement.className = 'upload-item bg-gray-50 rounded-lg p-4';
        uploadElement.innerHTML = `
            <div class="flex items-start space-x-3">
                <div class="flex-shrink-0">
                    <img src="${upload.imageUrl}" 
                         class="w-16 h-16 object-cover rounded-lg cursor-pointer" 
                         alt="${upload.name}"
                         onclick="openImageGallery('${upload.imageUrl}')">
                </div>
                <div class="flex-1 min-w-0">
                    <div class="flex items-start justify-between">
                        <div>
                            <h4 class="font-medium text-gray-900 text-sm truncate">${upload.name}</h4>
                            <span class="type-badge type-${upload.type} text-xs">
                                ${getTypeDisplayName(upload.type)}
                            </span>
                        </div>
                        <button onclick="deleteUpload(${upload.id})" class="text-gray-400 hover:text-red-500 transition-colors">
                            <i class="fas fa-trash text-xs"></i>
                        </button>
                    </div>
                    <p class="text-gray-500 text-xs mt-1">${formatDateTime(upload.uploadDate)}</p>
                    ${upload.description ? `<p class="text-gray-600 text-xs mt-1">${upload.description}</p>` : ''}
                    ${upload.associatedWith ? `
                        <div class="mt-2">
                            <span class="inline-flex items-center px-2 py-1 rounded-full text-xs bg-green-100 text-green-800">
                                <i class="fas fa-link mr-1"></i>Associated
                            </span>
                        </div>
                    ` : ''}
                </div>
            </div>
        `;
        container.appendChild(uploadElement);
    });
}

function updateUploadStatistics() {
    const uploads = JSON.parse(localStorage.getItem('imageUploads')) || [];
    
    const totalUploads = uploads.length;
    const receiptCount = uploads.filter(u => u.type === 'receipt').length;
    const labelCount = uploads.filter(u => u.type === 'food-label').length;
    const associatedCount = uploads.filter(u => u.associatedWith).length;

    document.getElementById('totalUploads').textContent = totalUploads;
    document.getElementById('receiptCount').textContent = receiptCount;
    document.getElementById('labelCount').textContent = labelCount;
    document.getElementById('associatedCount').textContent = associatedCount;
}

function populateAssociationDropdowns() {
    const inventory = JSON.parse(localStorage.getItem('inventory')) || [];
    const consumptionHistory = JSON.parse(localStorage.getItem('consumptionHistory')) || [];
    
    const inventorySelect = document.getElementById('inventoryAssociation');
    const consumptionSelect = document.getElementById('consumptionAssociation');

    // Populate inventory options
    inventorySelect.innerHTML = '<option value="">Select Inventory Item</option>';
    inventory.forEach(item => {
        const option = document.createElement('option');
        option.value = `inventory|${item.name}`;
        option.textContent = `${item.name} (${item.quantity} ${item.unit})`;
        inventorySelect.appendChild(option);
    });

    // Populate consumption options (last 10 entries)
    consumptionSelect.innerHTML = '<option value="">Select Consumption Entry</option>';
    const recentConsumption = consumptionHistory.slice(-10).reverse();
    recentConsumption.forEach(entry => {
        const option = document.createElement('option');
        option.value = `consumption|${entry.item}`;
        option.textContent = `${entry.item} - ${formatDateTime(entry.date)}`;
        consumptionSelect.appendChild(option);
    });
}

// Global functions for HTML onclick events
window.openImageGallery = function(imageUrl) {
    document.getElementById('galleryImage').src = imageUrl;
    showModal('galleryModal');
};

window.deleteUpload = function(uploadId) {
    if (confirm('Are you sure you want to delete this upload?')) {
        const uploads = JSON.parse(localStorage.getItem('imageUploads')) || [];
        const filteredUploads = uploads.filter(u => u.id !== uploadId);
        localStorage.setItem('imageUploads', JSON.stringify(filteredUploads));
        
        loadRecentUploads();
        updateUploadStatistics();
        showSuccess('Upload deleted successfully!');
    }
};

// Utility Functions
function getInventoryOptions() {
    const inventory = JSON.parse(localStorage.getItem('inventory')) || [];
    return inventory.map(item => 
        `<option value="inventory|${item.id}">${item.name} (${item.quantity} ${item.unit})</option>`
    ).join('');
}

function getConsumptionOptions() {
    const consumptionHistory = JSON.parse(localStorage.getItem('consumptionHistory')) || [];
    const recentConsumption = consumptionHistory.slice(-10).reverse();
    return recentConsumption.map(entry =>
        `<option value="consumption|${entry.item}">${entry.item} - ${formatDateTime(entry.date)}</option>`
    ).join('');
}

function getTypeDisplayName(type) {
    const typeMap = {
        'receipt': 'Receipt',
        'food-label': 'Food Label',
        'ingredient-list': 'Ingredients',
        'other': 'Other'
    };
    return typeMap[type] || type;
}

function getCurrentDateTime() {
    const now = new Date();
    now.setMinutes(now.getMinutes() - now.getTimezoneOffset());
    return now.toISOString().slice(0, 16);
}

function formatDateTime(dateString) {
    return new Date(dateString).toLocaleDateString() + ' ' + 
           new Date(dateString).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'});
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

function showSuccess(message) {
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

function showError(message) {
    // Create temporary error message
    const errorDiv = document.createElement('div');
    errorDiv.className = 'fixed top-20 right-4 bg-red-500 text-white px-6 py-3 rounded-lg shadow-lg z-50';
    errorDiv.innerHTML = `
        <div class="flex items-center">
            <i class="fas fa-exclamation-circle mr-2"></i>
            <span>${message}</span>
        </div>
    `;
    
    document.body.appendChild(errorDiv);
    
    setTimeout(() => {
        errorDiv.remove();
    }, 3000);
}