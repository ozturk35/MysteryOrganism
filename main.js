// Returns a random DNA base
const returnRandBase = (excludedBase) => {
  const dnaBases = ['A', 'T', 'C', 'G'];
  if (excludedBase) {
    dnaBases.filter(base => base != excludedBase);
    return dnaBases[Math.floor(Math.random() * 3)];
  }
  else {
    return dnaBases[Math.floor(Math.random() * 4)];
  }
};

// Returns a random single stand of DNA containing 15 bases
const mockUpStrand = () => {
  const newStrand = [];
  for (let i = 0; i < 15; i++) {
    newStrand.push(returnRandBase());
  }
  return newStrand;
};

// Returns a P. aequor object
const pAequorFactory = (newSpecimenNum, newDna) => {
  return {
    _specimenNum: newSpecimenNum,
    _dna: newDna,

    mutate() {
      const randBaseIndex = Math.floor(Math.random() * this._dna.length);
      this._dna[randBaseIndex] = returnRandBase(this._dna[randBaseIndex]);
    },

    compareDNA(pAequorObj) {
      if (pAequorObj._dna.length !== this._dna.length) {
        console.log("DNA's have different number of bases!")
        return;
      }

      let sameCount = 0;
      let dnaPerc   = 0;
      pAequorObj._dna.forEach((base, index) => {
        if (base === this._dna[index]){
          sameCount += 1;
        }
      });
      dnaPerc = Math.floor((sameCount * 100) / this._dna.length);
      console.log(`Specimen #1 and specimen #2 have ${dnaPerc}% DNA in common`);
      return dnaPerc;
    },

    willLikelySurvive() {
      let count = 0;
      this._dna.forEach(base => {
        if (base === 'G' || base === 'C') {
          count += 1;
        }
      })
      return count/this._dna.length >= .6 ? true : false;
    },

    complementaryStrand() {
      const complementaryStrand = []
      this._dna.map(base => {
        if     (base === 'A') {complementaryStrand.push('T')}
        else if(base === 'T') {complementaryStrand.push('A')}
        else if(base === 'G') {complementaryStrand.push('C')}
        else                  {complementaryStrand.push('G')}
      })
      return complementaryStrand;
    }
  };
};

const pAequorSurvivorSamples = [];
let specimenNum = 1;
let specimen = {};

const create30SurvivorpAequorSamples = () => {
  while (pAequorSurvivorSamples.length < 30) {
    specimen = pAequorFactory(specimenNum, mockUpStrand());
    if (specimen.willLikelySurvive()){
      pAequorSurvivorSamples.push(specimen);
      specimenNum += 1;
    }
  };
};

for (let i = 0; i < pAequorSurvivorSamples.length; i++) {
  for (let j = 1; j < pAequorSurvivorSamples.length - 1; j++) {
    pAequorSurvivorSamples[i].compareDNA(pAequorSurvivorSamples)
  }
}

const specimen1 = pAequorFactory(1, mockUpStrand());
console.log(specimen1._dna);
console.log(specimen1.complementaryStrand());