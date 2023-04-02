const urlDogApi = 'https://dog.ceo/api/breeds/image/random';

fetch(urlDogApi)
    .then(response => response.json())
    .then(data => {
        //dogImage irá receber uma imagem aleatória de um cachorro
        const dogImage = data.message

        //imageElement é definida para conter uma referência ao elemento de imagem com um ID dog-image no DOM
        const imageElement = document.getElementById("dog-image")

        //Passando a imagem que está na const dogImage para o src="" no HTML, usando como referência imageElement
        imageElement.src = dogImage
        imageElement.classList.add("fade-in")//Efeito de transição da imagem do cachorro
    })
    .catch(error => console.log('Erro ao buscar Dogzinho', error));

//Seleciona o botão "Salvar Dog"
const saveButton = document.getElementById('save-button');

//Seleciona a imagem do cachorro
const dogImage = document.getElementById('dog-image');

//Adiciona um evento de clique no botão "Salvar Dog"
saveButton.addEventListener('click', async () => {
  try {
    //Faz uma solicitação para obter a imagem do cachorro usando o método fetch
    const response = await fetch(dogImage?.src); //O ? faz que o .src só será acessado caso a const dogImagem não for null ou undefined, caso for retorna undefined

    //Verifica se a solicitação HTTP foi bem-sucedida
    if (!response.ok) {
      throw new Error('Erro ao buscar imagem do cachorro');
    }

    //Converte a imagem em um objeto Blob
    const blob = await response.blob();

    //Cria um URL para a imagem Blob usando o objeto URL
    const url = URL.createObjectURL(blob);

    //Cria um elemento <a> para fazer o download da imagem
    const link = document.createElement('a');
    link.href = url;
    link.download = 'cachorro.jpg';
    document.body.appendChild(link);

    //Simula um clique no elemento <a> para iniciar o download
    link.click();

    //Remove o elemento <a> da página
    document.body.removeChild(link);

    //Revoga o URL da imagem Blob para liberar recursos de memória
    URL.revokeObjectURL(url);

  } catch (error) {
    //Captura e trata quaisquer erros que possam ocorrer durante o processo
    console.error('Erro ao salvar imagem do cachorro', error);
  }
});