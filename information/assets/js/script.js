let driverCount = 1;
let injuredDriverCount = 1;
let passengerCount = 1;

// Sürücü bilgilerini içeren bir dizi
const drivers = [];

function addDriver() {
  const container = document.getElementById('driversContainer');
  const driverDiv = document.createElement('div');
  const currentDriverCount = driverCount;
  driverDiv.innerHTML = `
    <h2>Kazaya Karışan Araç ${currentDriverCount}</h2>
    <label for="plate${currentDriverCount}">PLAKA:</label>
    <input type="text" id="plate${currentDriverCount}" name="plate${currentDriverCount}" required>

    <label for="driverDescription${currentDriverCount}">AÇIKLAMA:</label>
    <input type="text" id="driverDescription${currentDriverCount}" name="driverDescription${currentDriverCount}" required>
  `;

  container.appendChild(driverDiv);
  const plateElement = document.getElementById(`plate${currentDriverCount}`);
  const descriptionElement = document.getElementById(`driverDescription${currentDriverCount}`);
  const plateValue = plateElement.value.trim();
  const descriptionValue = descriptionElement.value.trim();
  addDriverInfo(plateValue, descriptionValue);
  driverCount++;
}
function addDriverInfo(plate, description) {
  drivers.push({ plate, description });
}


function addInjuredDriver() {
  const container = document.getElementById('injuredDriversContainer');
  const injuredDriverDiv = document.createElement('div');
  injuredDriverDiv.innerHTML = `
    <h2>Yaralı Sürücü ${injuredDriverCount}</h2>

    <label for="injuredDriverPlate${injuredDriverCount}">ARAÇ:</label>
    <select id="injuredDriverPlate${injuredDriverCount}" name="injuredDriverPlate${injuredDriverCount}" required>
      <!-- Buraya araç plakalarını ekleyeceğiz -->
    </select>

    <label for="injuredDriverName${injuredDriverCount}">AD SOYAD:</label>
    <input type="text" id="injuredDriverName${injuredDriverCount}" name="injuredDriverName${injuredDriverCount}" required>

    <label for="injuredDriverFatherName${injuredDriverCount}">BABA ADI:</label>
    <input type="text" id="injuredDriverFatherName${injuredDriverCount}" name="injuredDriverFatherName${injuredDriverCount}" required>

    <label for="injuredDriverBirthDate${injuredDriverCount}">DOĞUM TARİHİ:</label>
    <input type="date" id="injuredDriverBirthDate${injuredDriverCount}" name="injuredDriverBirthDate${injuredDriverCount}" required>

    <label for="injuredDriverBirthPlace${injuredDriverCount}">DOĞUM YERİ:</label>
    <input type="text" id="injuredDriverBirthPlace${injuredDriverCount}" name="injuredDriverBirthPlace${injuredDriverCount}" required>

    <label for="injuredDriverHealth${injuredDriverCount}">SAĞLIK DURUMU:</label>
    <input type="text" id="injuredDriverHealth${injuredDriverCount}" name="injuredDriverHealth${injuredDriverCount}" required>

    <label for="injuredDriverHospital${injuredDriverCount}">SEVK EDİLEN HASTANE:</label>
    <input type="text" id="injuredDriverHospital${injuredDriverCount}" name="injuredDriverHospital${injuredDriverCount}" required>
  `;
  container.appendChild(injuredDriverDiv);
  injuredDriverCount++;

  // Araç plakalarını seçim kutusuna ekleyelim
  updateInjuredDriverPlates();
}

function addPassenger() {
  const container = document.getElementById('passengersContainer');
  const passengerDiv = document.createElement('div');
  passengerDiv.innerHTML = `
    <h2>Yaralı/Ölen | ${passengerCount}</h2>

    <label for="passengerPlate${passengerCount}">ARAÇ:</label>
    <select id="passengerPlate${passengerCount}" name="passengerPlate${passengerCount}" required>
      <!-- Buraya araç plakalarını ekleyeceğiz -->
    </select>

    <label for="passengerType${passengerCount}">Yaralı/Yolcu/Ölen Türü:</label>
    <select id="passengerType${passengerCount}" name="passengerType${passengerCount}" required>
      <option value="yaraliYolcu">Yaralı Yolcu</option>
      <option value="yaraliYaya">Yaralı Yaya</option>
      <option value="olenYolcu">Ölen Yolcu</option>
      <option value="olenYaya">Ölen Yaya</option>
    </select>

    <label for="passengerName${passengerCount}">AD SOYAD:</label>
    <input type="text" id="passengerName${passengerCount}" name="passengerName${passengerCount}" required>

    <label for="passengerFatherName${passengerCount}">BABA ADI:</label>
    <input type="text" id="passengerFatherName${passengerCount}" name="passengerFatherName${passengerCount}" required>

    <label for="passengerBirthDate${passengerCount}">DOĞUM TARİHİ:</label>
    <input type="date" id="passengerBirthDate${passengerCount}" name="passengerBirthDate${passengerCount}" required>

    <label for="passengerBirthPlace${passengerCount}">DOĞUM YERİ:</label>
    <input type="text" id="passengerBirthPlace${passengerCount}" name="passengerBirthPlace${passengerCount}" required>

    <label for="passengerHealth${passengerCount}">SAĞLIK DURUMU:</label>
    <input type="text" id="passengerHealth${passengerCount}" name="passengerHealth${passengerCount}" required>

    <label for="passengerHospital${passengerCount}">SEVK EDİLEN HASTANE:</label>
    <input type="text" id="passengerHospital${passengerCount}" name="passengerHospital${passengerCount}" required>
  `;
  container.appendChild(passengerDiv);
  passengerCount++;

  // Araç plakalarını seçim kutusuna ekleyelim
  updatePassengerPlates();
}

function updatePassengerPlates() {
  const selectElement = document.getElementById(`passengerPlate${passengerCount - 1}`);
  selectElement.innerHTML = ""; // Önceki seçenekleri temizle

  for (let i = 1; i < driverCount; i++) {
    const plateElement = document.getElementById(`plate${i}`);
    const plateValue = plateElement.value.trim();

    const descriptionElement = document.getElementById(`driverDescription${i}`);
    const descriptionValue = descriptionElement ? descriptionElement.value.trim() : "";

    if (plateValue !== "") {
      const optionElement = document.createElement('option');
      optionElement.value = `${plateValue}`;
      optionElement.text = descriptionValue ? `${plateValue} | ${descriptionValue}` : `${plateValue}`;

      selectElement.add(optionElement);
    }
  }
}

function updateInjuredDriverPlates() {
  const selectElement = document.getElementById(`injuredDriverPlate${injuredDriverCount - 1}`);
  selectElement.innerHTML = ""; // Önceki seçenekleri temizle

  for (let i = 1; i < driverCount; i++) {
    const plateElement = document.getElementById(`plate${i}`);
    const plateValue = plateElement.value.trim();

    const descriptionElement = document.getElementById(`driverDescription${i}`);
    const descriptionValue = descriptionElement ? descriptionElement.value.trim() : "";

    if (plateValue !== "") {
      const optionElement = document.createElement('option');
      optionElement.value = `${plateValue}`;
      optionElement.text = descriptionValue ? `${plateValue} | ${descriptionValue}` : `${plateValue}`;

      selectElement.add(optionElement);
    }
  }
}

function submitForm() {
  document.getElementById('accidentForm').style.display = 'none';
  document.getElementById('confirmation').classList.remove('hidden');
}
