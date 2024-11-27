const { Picker } = window.EmojiMart;
    const emojiButton = document.getElementById('emojiButton');
    const emojiPicker = document.getElementById('emojiPicker');
    const postText = document.getElementById('add-description');
 
    // Initialize Emoji Picker
    const picker = new Picker({
      onEmojiSelect: (emoji) => {
        // Add the selected emoji to the textarea
        postText.value += emoji.native;
      },
      style: {
        position: 'absolute',
        bottom: '10px',
        left: '10px',
      },
    });
 
    // Append the picker to the emoji picker container
    emojiPicker.appendChild(picker);
 
    // Show/hide the emoji picker
    emojiButton.addEventListener('click', () => {
      emojiPicker.style.display = emojiPicker.style.display === 'none' ? 'block' : 'none';
    });
 
    // Close the emoji picker when clicking outside
    document.addEventListener('click', (event) => {
      if (!emojiPicker.contains(event.target) && event.target !== emojiButton) {
        emojiPicker.style.display = 'none';
      }
    });


