const API_URL = 'https://fsa-crud-2aa9294fe819.herokuapp.com/api/2510-CPU-RM-WEB-PT/events';

const state = {
  parties: [],
  selectedParty: null
};

async function fetchParties() {
  try {
    const response = await fetch(API_URL);
    const data = await response.json();
    state.parties = data.data;
    render();
  } catch (error) {
    console.error('Error fetching parties:', error);
  }
}

async function fetchPartyById(id) {
  try {
    const response = await fetch(`${API_URL}/${id}`);
    const data = await response.json();
    state.selectedParty = data.data;
    render();
  } catch (error) {
    console.error('Error fetching party details brotherrrr:', error);
  }
}

function renderPartyList() {
  if (!state.parties.length) {
    return '<p>Loading parties...</p>';
  }

  const partyItems = state.parties.map(party => {
    return `<li><a href="#" data-id="${party.id}">${party.name}</a></li>`;
  }).join('');

  return `
    <div class="party-list">
      <h2>Upcoming Parties</h2>
      <ul>${partyItems}</ul>
    </div>
  `
}

function renderPartyDetails() {
  if (!state.selectedParty) {
    return '<p>Please select a party to see details.</p>';
  }

  const party = state.selectedParty;
  return `
    <div class="party-details">
      <h2>Party Details</h2>
      <p><strong>Name:</strong> ${party.name}</p>
      <p><strong>ID:</strong> ${party.id}</p>
      <p><strong>Date:</strong> ${new Date(party.date).toLocaleDateString()}</p>
      <p><strong>Location:</strong> ${party.location}</p>
      <p><strong>Description:</strong> ${party.description}</p>
    </div>
  `
}

function render() {
  const app = document.getElementById('app');
  
  app.innerHTML = `
    <h1>Party Planner</h1>
    <div class="container">
      ${renderPartyList()}
      ${renderPartyDetails()}
    </div>
  `
  addEventListeners();
}

function addEventListeners() {
  const partyLinks = document.querySelectorAll('.party-list a');
  
  partyLinks.forEach(link => {
    link.addEventListener('click', async (event) => {
      event.preventDefault();
      const partyId = event.target.dataset.id;
      await fetchPartyById(partyId);
    });
  });
}

async function init() {
  await fetchParties();
}
init();