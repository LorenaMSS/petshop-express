//modulo próprio
const moment = require('moment');
const fs = require('fs');
let bancoDados = fs.readFileSync('./bancoDados.json', 'utf-8');

bancoDados = JSON.parse(bancoDados);

const petshop = {
  atualizaBanco: () => {
    let petsAtualizado = JSON.stringify(bancoDados, null, 2);
    fs.writeFileSync('bancoDados.json', petsAtualizado, 'utf-8');
  },

  listarPets: () => {
    let textoListaPets = 'Petshop\n';

    bancoDados.pets.forEach((pet) => {
      let { nome, idade, tipo, raca, vacinado, servicos } = pet;

      textoListaPets += `${nome}, ${idade} anos, ${tipo}, ${raca}, ${
        vacinado ? 'vacinado' : 'não vacinado'
      }\n`;

      pet.servicos.forEach((servico) => {
        textoListaPets += `${servico.data} - ${servico.nome} \n`;
      });
    });
    return textoListaPets;
  },

  contatoTutor: (pet) => {
    let { nome, tutor, contato } = contatoPet;

    return `Tutor: ${tutor}
     Contato: ${contato}
     Pet: ${nome}`;
  },

  filtratTutor: (nomeTutor) => {
    let petsTutor = bancoDados.pets.filter((pet) => {
      return pet.tutor == nomeTutor;
    });

    console.log(`Pets do tutor ${nomeTutor}`);
    petsTutor.forEach((pet) => {
      console.log(`${pet.nome}- ${pet.tipo}`);
    });
  },
  filtrarTipoPet: (tipoPet) => {
    let petEncontrados = bancoDados.pets.filter((pet) => {
      return pet.tipo == tipoPet;
    });
    return petEncontrados;
  },

  clientePremium: (pet) => {
    let { nome } = pet;
    let nServicos = pet.servicos.length;

    if (nServicos > 5) {
      console.log(
        `Olá, ${nome}! Você é um cliente especial e ganhou um descontão!`
      );
    } else {
      console.log(`Olá, ${nome}! Você ainda não tem descontos disponiveis!`);
    }
  },

  buscarPet: (nomePet) => {
    let textoBuscarPet = '';
    let petEncontrado = bancoDados.pets.find((pet) => {
      return pet.nome == nomePet;
    });

    if (petEncontrado) {
      return (textoBuscarPet = +`${nomePet} foi encontrado!`);
    } else {
      return (textoBuscarPet = +`${nomePet} não foi encontrado!`);
    }
  },

  vacinarPet: (pet) => {
    if (!pet.vacinado) {
      pet.vacinado = true;
      atualizarBanco();
      console.log(`${pet.nome} foi vacinado com sucesso!`);
    } else {
      console.log(`Ops, ${pet.nome} já está vacinado!`);
    }
  },

  campanhaVac: () => {
    let cont = 0;
    const vac = bancoDados.pets.map(function (pet) {
      if (pet.vacinado == false) {
        vacinarPet(pet);
        cont++;
      }
    });
    console.log(cont + ' pets foram vacinados nessa campanha!');
  },

  novoCliente: () => {
    let novoPet = {
      nome: 'Sansa',
      tipo: 'Gato',
      idade: '1',
      raca: 'SRD',
      peso: '2',
      tutor: 'Ana',
      contato: '(81) 99699-0000',
      vacinado: false,
      servicos: [],
    };
    adicionarPet(novoPet);
  },
  darBanho: (pet) => {
    for (let pet of bancoDados.pets) {
      if (pet.nome == nomep) {
        pet.servicos.push({
          nome: 'banho',
          data: moment().format('DD-MM-YYYY'),
        });
        console.log(`${pet.nome} está tomando banho...`);
        console.log(`${pet.nome} está de banho tomado!`);
        console.log(`este serviço ocorreu em ${moment().format('L')}`);
        atualizaBanco();
      }
    }
  },

  tosarPet: (pet) => {
    nomep = pet.nome;

    for (let pet of bancoDados.pets) {
      if (pet.nome == nomep) {
        pet.servicos.push({
          nome: 'tosa',
          data: moment().format('DD-MM-YYYY'),
        });
        console.log(`${pet.nome} está sendo tosado...`);
        console.log(`${pet.nome} está com o cabelinho cortado!`);
        console.log(`este serviço ocorreu em ${moment().format('L')}`);
        atualizaBanco();
      }
    }
  },
  cortarUnhas: (pet) => {
    nomep = pet.nome;

    for (let pet of bancoDados.pets) {
      if (pet.nome == nomep) {
        pet.servicos.push({
          nome: 'corte de Unhas',
          data: moment().format('DD-MM-YYYY'),
        });
        console.log(`${pet.nome} está cortando as unhas...`);
        console.log(`${pet.nome} está com a manicure em dia!`);
        console.log(`este serviço ocorreu em ${moment().format('L')}`);
        atualizaBanco();
      }
    }
  },

  atenderCliente: (pet, servicos) => {
    console.log(`Olá ${pet.nome}`);

    servicos ? servicos(pet) : console.log('só  estou dando uma olhadinha');
    console.log('Tchau, até mais!');
  },

  adicionarPets: (...novospets) => {
    let textoAddPets = 'Adicionando PET';
    novospets.forEach((novopet) => {
      bancoDados.pets.push(novopet);
    });

    novospets.forEach((pet) => {
      textoAddPets += `${pet.nome} foi adicionado com sucesso!`;
    });
  },
};

module.exports = petshop;
