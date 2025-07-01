export const uiHtml = `<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <title>Circular Percent Plugin</title>
  <style>
    * {
      box-sizing: border-box;
      margin: 0;
      padding: 0;
    }
    
    body {
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;
      font-size: 14px;
      line-height: 1.4;
      padding: 20px;
      background: var(--figma-color-bg);
      color: var(--figma-color-text);
      min-height: 100vh;
    }
    
    .container {
      max-width: 300px;
      width: 100%;
    }
    
    h1 {
      font-size: 18px;
      font-weight: 600;
      margin-bottom: 20px;
      color: var(--figma-color-text);
    }
    
    .form-group {
      margin-bottom: 16px;
    }
    
    label {
      display: block;
      margin-bottom: 8px;
      font-size: 12px;
      font-weight: 500;
      color: var(--figma-color-text);
    }
    
    .input-container {
      position: relative;
    }
    
    input[type="number"] {
      width: 100%;
      padding: 8px 12px;
      padding-right: 30px;
      border: 1px solid var(--figma-color-border);
      border-radius: 4px;
      background: var(--figma-color-bg);
      color: var(--figma-color-text);
      font-size: 14px;
      outline: none;
      -webkit-appearance: textfield;
      -moz-appearance: textfield;
      appearance: textfield;
    }
    
    input[type="number"]::-webkit-outer-spin-button,
    input[type="number"]::-webkit-inner-spin-button {
      -webkit-appearance: none;
      margin: 0;
    }
    
    input[type="number"]:focus {
      border-color: var(--figma-color-border-brand);
    }
    
    input[type="text"] {
      width: 100%;
      padding: 8px 12px;
      border: 1px solid var(--figma-color-border);
      border-radius: 4px;
      background: var(--figma-color-bg);
      color: var(--figma-color-text);
      font-size: 14px;
      outline: none;
      font-family: 'Monaco', 'Menlo', 'Ubuntu Mono', monospace;
    }
    
    input[type="text"]:focus {
      border-color: var(--figma-color-border-brand);
    }
    
    .percent-symbol {
      position: absolute;
      right: 12px;
      top: 50%;
      transform: translateY(-50%);
      font-size: 14px;
      color: var(--figma-color-text-secondary);
      pointer-events: none;
    }
    
    .size-group {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 12px;
      margin-bottom: 16px;
    }
    
    .color-group {
      display: grid;
      grid-template-columns: 1fr 1fr 1fr;
      gap: 12px;
      margin-bottom: 20px;
    }
    
    .color-input {
      display: flex;
      flex-direction: column;
      gap: 8px;
    }
    
    .color-picker-row {
      display: flex;
      align-items: center;
      gap: 8px;
    }
    
    input[type="color"] {
      width: 32px;
      height: 32px;
      border: 1px solid var(--figma-color-border);
      border-radius: 4px;
      cursor: pointer;
      padding: 0;
      background: none;
    }
    
    .color-hex-input {
      flex: 1;
      font-size: 12px;
      padding: 6px 8px;
    }
    
    .color-label {
      font-size: 12px;
      color: var(--figma-color-text-secondary);
    }
    
    .button {
      width: 100%;
      background: var(--figma-color-bg-brand);
      color: var(--figma-color-text-onbrand);
      border: none;
      border-radius: 6px;
      padding: 12px 24px;
      font-size: 14px;
      font-weight: 500;
      cursor: pointer;
      transition: all 0.2s ease;
    }
    
    .button:hover {
      background: var(--figma-color-bg-brand-hover);
    }
    
    .button:active {
      background: var(--figma-color-bg-brand-pressed);
    }
    
    .button:disabled {
      background: var(--figma-color-bg-disabled);
      color: var(--figma-color-text-disabled);
      cursor: not-allowed;
    }
    
    .status {
      margin-top: 16px;
      padding: 8px;
      border-radius: 4px;
      font-size: 12px;
      min-height: 20px;
    }
    
    .status.success {
      background: var(--figma-color-bg-success);
      color: var(--figma-color-text-onsuccess);
    }
    
    .status.error {
      background: var(--figma-color-bg-danger);
      color: var(--figma-color-text-ondanger);
    }
  </style>
</head>
<body>
  <div class="container">
    <h1>📊 Circular Percent Chart</h1>
    
    <div class="form-group">
      <label for="percentage">Percentage</label>
      <div class="input-container">
        <input type="number" id="percentage" min="0" max="100" value="55" />
        <span class="percent-symbol">%</span>
      </div>
    </div>
    
    <div class="size-group">
      <div class="form-group">
        <label for="size">Size</label>
        <input type="number" id="size" min="50" max="500" value="200" />
      </div>
      <div class="form-group">
        <label for="stroke-width">Stroke Width</label>
        <input type="number" id="stroke-width" min="5" max="50" value="20" />
      </div>
    </div>
    
    <div class="color-group">
      <div class="form-group">
        <label>Background Color</label>
        <div class="color-input">
          <div class="color-picker-row">
            <input type="color" id="bg-color" value="#E5E7EB" />
            <span class="color-label">Background</span>
          </div>
          <input type="text" id="bg-color-hex" class="color-hex-input" value="#E5E7EB" placeholder="#RRGGBB" maxlength="7" />
        </div>
      </div>
      <div class="form-group">
        <label>Progress Color</label>
        <div class="color-input">
          <div class="color-picker-row">
            <input type="color" id="progress-color" value="#8B5CF6" />
            <span class="color-label">Progress</span>
          </div>
          <input type="text" id="progress-color-hex" class="color-hex-input" value="#8B5CF6" placeholder="#RRGGBB" maxlength="7" />
        </div>
      </div>
      <div class="form-group">
        <label>Text Color</label>
        <div class="color-input">
          <div class="color-picker-row">
            <input type="color" id="text-color" value="#000000" />
            <span class="color-label">Text</span>
          </div>
          <input type="text" id="text-color-hex" class="color-hex-input" value="#000000" placeholder="#RRGGBB" maxlength="7" />
        </div>
      </div>
    </div>
    
    <button id="create-button" class="button">
      Create Chart
    </button>
    
    <div id="status" class="status"></div>
  </div>

  <script>
    const createButton = document.getElementById('create-button');
    const statusDiv = document.getElementById('status');
    const percentageInput = document.getElementById('percentage');
    const sizeInput = document.getElementById('size');
    const strokeWidthInput = document.getElementById('stroke-width');
    const bgColorInput = document.getElementById('bg-color');
    const bgColorHexInput = document.getElementById('bg-color-hex');
    const progressColorInput = document.getElementById('progress-color');
    const progressColorHexInput = document.getElementById('progress-color-hex');
    const textColorInput = document.getElementById('text-color');
    const textColorHexInput = document.getElementById('text-color-hex');
    
    // Helper function to validate hex color
    function isValidHex(hex) {
      return /^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/.test(hex);
    }
    
    // Helper function to convert 3-digit hex to 6-digit
    function expandHex(hex) {
      if (hex.length === 4) {
        return '#' + hex[1] + hex[1] + hex[2] + hex[2] + hex[3] + hex[3];
      }
      return hex;
    }
    
    // Sync color picker with hex input
    function setupColorSync(colorInput, hexInput) {
      colorInput.addEventListener('input', (e) => {
        hexInput.value = e.target.value.toUpperCase();
      });
      
      hexInput.addEventListener('input', (e) => {
        let value = e.target.value;
        if (!value.startsWith('#')) {
          value = '#' + value;
          e.target.value = value;
        }
        
        if (isValidHex(value)) {
          const expandedHex = expandHex(value);
          colorInput.value = expandedHex;
          e.target.style.borderColor = 'var(--figma-color-border)';
        } else {
          e.target.style.borderColor = 'var(--figma-color-border-danger)';
        }
      });
      
      hexInput.addEventListener('blur', (e) => {
        if (!isValidHex(e.target.value)) {
          e.target.value = colorInput.value.toUpperCase();
          e.target.style.borderColor = 'var(--figma-color-border)';
        }
      });
    }
    
    // Setup color sync for all color inputs
    setupColorSync(bgColorInput, bgColorHexInput);
    setupColorSync(progressColorInput, progressColorHexInput);
    setupColorSync(textColorInput, textColorHexInput);
    
    function showStatus(message, type = 'success') {
      statusDiv.textContent = message;
      statusDiv.className = \`status \${type}\`;
      
      // Clear status after 3 seconds
      setTimeout(() => {
        statusDiv.textContent = '';
        statusDiv.className = 'status';
      }, 3000);
    }
    
    // Handle create button click
    createButton.addEventListener('click', () => {
      const percentage = parseInt(percentageInput.value) || 0;
      const size = parseInt(sizeInput.value) || 200;
      const strokeWidth = parseInt(strokeWidthInput.value) || 20;
      const bgColor = bgColorInput.value;
      const progressColor = progressColorInput.value;
      const textColor = textColorInput.value;
      
      if (percentage < 0 || percentage > 100) {
        showStatus('❌ Percentage must be between 0 and 100', 'error');
        return;
      }
      
      createButton.disabled = true;
      createButton.textContent = 'Creating...';
      
      // Send message to plugin code
      parent.postMessage({
        pluginMessage: {
          type: 'create-circular-chart',
          data: {
            percentage,
            size,
            strokeWidth,
            bgColor,
            progressColor,
            textColor
          }
        }
      }, '*');
    });
    
    // Listen for messages from plugin code
    onmessage = (event) => {
      const message = event.data.pluginMessage;
      
      if (message.type === 'creation-complete') {
        createButton.disabled = false;
        createButton.textContent = 'Create Chart';
        showStatus(\`✅ Circular chart (\${message.percentage}%) created successfully!\`, 'success');
      } else if (message.type === 'creation-error') {
        createButton.disabled = false;
        createButton.textContent = 'Create Chart';
        showStatus('❌ Error: ' + message.error, 'error');
      }
    };
  </script>
</body>
</html>`;
