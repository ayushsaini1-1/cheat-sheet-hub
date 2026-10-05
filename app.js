const storageKey = 'Cheetsheet';
let snippets = [];

const noteForm = document.getElementById('noteForm');
const noteTitle = document.getElementById('noteTitle');
const noteCategory = document.getElementById('noteCategory');
const noteContent = document.getElementById('noteContent');
const searchInput = document.getElementById('searchInput');
const clearSearch = document.getElementById('clearSearch');
const snippetsGrid = document.getElementById('snippetsGrid');
const noteCount = document.getElementById('noteCount');
const emptyState = document.getElementById('emptyState');
const emptyTitle = document.getElementById('emptyTitle');
const emptyDesc = document.getElementById('emptyDesc');
const message = document.getElementById('message');

const savedSnippets = localStorage.getItem(storageKey);
if (savedSnippets !== null) {
  snippets = JSON.parse(savedSnippets);
}

function saveSnippets() {
  localStorage.setItem(storageKey, JSON.stringify(snippets));
}

function addSnippet(event) {
  event.preventDefault();

  const title = noteTitle.value.trim();
  const content = noteContent.value.trim();

  if (title === '' || content === '') {
    message.textContent = 'Enter a title and snippet.';
    return;
  }

  const snippet = {
    id: 'snip-' + Date.now(),
    title: title,
    category: noteCategory.value,
    content: content,
    timestamp: Date.now()
  };

  snippets.unshift(snippet);
  saveSnippets();
  noteTitle.value = '';
  noteContent.value = '';
  searchInput.value = '';
  renderSnippets();
  message.textContent = 'Snippet saved.';
}

function deleteSnippet(id) {
  const remainingSnippets = [];

  for (let i = 0; i < snippets.length; i++) {
    if (snippets[i].id !== id) {
      remainingSnippets.push(snippets[i]);
    }
  }

  snippets = remainingSnippets;
  saveSnippets();
  renderSnippets();
  message.textContent = 'Snippet deleted.';
}

function createCard(snippet) {
  const card = document.createElement('article');
  card.className = 'snippet-card';

  const title = document.createElement('h3');
  title.textContent = snippet.title;
  card.appendChild(title);

  const category = document.createElement('p');
  category.className = 'category';
  category.textContent = snippet.category;
  card.appendChild(category);

  const code = document.createElement('pre');
  code.className = 'snippet-code';
  code.textContent = snippet.content;
  card.appendChild(code);

  const deleteButton = document.createElement('button');
  deleteButton.type = 'button';
  deleteButton.className = 'delete-button';
  deleteButton.textContent = 'Delete';
  deleteButton.onclick = function () {
    deleteSnippet(snippet.id);
  };
  card.appendChild(deleteButton);

  return card;
}

function renderSnippets() {
  const search = searchInput.value.trim().toLowerCase();
  let matches = 0;
  snippetsGrid.textContent = '';
  noteCount.textContent = snippets.length;

  for (let i = 0; i < snippets.length; i++) {
    const snippet = snippets[i];
    const title = snippet.title.toLowerCase();
    const content = snippet.content.toLowerCase();
    const category = snippet.category.toLowerCase();

    if (title.includes(search) || content.includes(search) || category.includes(search)) {
      snippetsGrid.appendChild(createCard(snippet));
      matches++;
    }
  }

  if (search === '') {
    clearSearch.style.display = 'none';
  } else {
    clearSearch.style.display = 'block';
  }

  if (matches === 0) {
    emptyState.style.display = 'block';
    if (search === '') {
      emptyTitle.textContent = 'No snippets saved yet';
      emptyDesc.textContent = 'Add a snippet using the form.';
    } else {
      emptyTitle.textContent = 'No matching snippets';
      emptyDesc.textContent = 'Try another title, command, or category.';
    }
  } else {
    emptyState.style.display = 'none';
  }
}

noteForm.onsubmit = addSnippet;
searchInput.oninput = renderSnippets;
clearSearch.onclick = function () {
  searchInput.value = '';
  renderSnippets();
};

renderSnippets();
