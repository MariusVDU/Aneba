# 🎮 Ameba Game Store - Greitasis Startas

## ⚡ Paleisti programą (1 komanda)

### **PowerShell (rekomenduojama):**
```powershell
.\start.ps1
```

### **Command Prompt:**
```cmd
start.bat
```

**Kas vyksta:**
1. ✅ Automatiškai įdiegia dependencies (jei reikia)
2. ✅ Paleidžia backend serverį (port 5000)
3. ✅ Paleidžia frontend serverį (port 3000)
4. ✅ Atidaro naršyklėje: http://localhost:3000

**Sustabdyti:** Spausk `Ctrl+C` - visi serveriai automatiškai sustos!

---

## 📁 Failai

| Failas | Aprašymas |
|--------|-----------|
| `start.ps1` | PowerShell paleidimas (su spalvomis) |
| `start.bat` | Batch paleidimas |
| `README.md` | Visa dokumentacija (anglų k.) |

---

## 🔧 Kas vyksta paleidžiant?

```
1. Patikrina ar įdiegtos dependencies
2. Jei ne - automatiškai įdiegia (npm install)
3. Paleidžia backend serverį (port 5000)
4. Paleidžia frontend serverį (port 3000)
5. Atidaro naršyklėje
```

---

## 🛑 Kaip sustabdyti?

Spausk `Ctrl+C` terminale kur veikia programa!

Visi serveriai automatiškai sustoja. Jokių papildomų komandų nereikia! ✨

---

## ❓ Problemos?

### Backend nepasileidžia (Port 5000 užimtas):
```powershell
# PowerShell - sustabdyk procesą ant porto 5000:
Get-NetTCPConnection -LocalPort 5000 | Select-Object -ExpandProperty OwningProcess | Stop-Process -Force

# Paskui paleisk iš naujo:
.\start.ps1
```

### Frontend nepasileidžia (Port 3000 užimtas):
**Nėra problemos!** Vite automatiškai ras kitą portą (3001, 3002...)

### Programa neveikia po Ctrl+C:
```powershell
# Sustabdyk visus node procesus:
Get-Process node -ErrorAction SilentlyContinue | Stop-Process -Force

# Paleisk iš naujo:
.\start.ps1
```

### Dependencies neįsidiegė:
```bash
# Įdiek rankiniu būdu:
npm install
cd client
npm install
cd ..
```

---

## 📖 Pilna dokumentacija

Žiūrėk `README.md` pilnai dokumentacijai apie:
- API endpoints
- Duomenų bazės struktūrą
- Kodo architektūrą
- Testavimą

---

## 🎯 Greitieji testai

Po paleidimo išbandyk:

1. **Paieška:** Įvesk "fifa" paieškos lange
2. **Filtravimas:** Bandyk "xbox", "playstation"
3. **Fuzzy search:** Įvesk "splt" (turėtų rasti "Split Fiction")
4. **API:** Atidary http://localhost:5000/list naršyklėje

---

**Sėkmės! 🚀**
