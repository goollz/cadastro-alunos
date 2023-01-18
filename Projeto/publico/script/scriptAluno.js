//GUSTAVO GARCIA DE CAMPOS 101911130
elemTabela = document.querySelector("[data-Tabela]");
elemFormulario = document.querySelector("[data-Formulario]");
var administrador;
var index;

window.onload = init; //CHAMA A JANELA

elemFormulario.onsubmit = () =>{
    
    if(validacao()){
        
        var elemNome = document.querySelector("[data-Nome]");
        var elemEmail = document.querySelector("[data-Email]");
        var elemCidade = document.querySelector("[data-Cidade]");
        var elemGosto = document.querySelector("input[name='Gosto']:checked");
        var elemData = document.querySelector("[data-Data]");
        var elemRA = document.querySelector("[data-RA]");
        var elemCurso = document.querySelector("[data-Curso]");
        var elemDificuldade = document.querySelector("input[name='Dificuldade']:checked");
        var elemBotaoEnvio = document.querySelector("[data-btnEnviar]");
        
        var aluno = new Aluno(0, elemNome.value, elemEmail.value, elemCidade.value, elemGosto.value, elemData.value, elemRA.value, elemCurso.value, elemDificuldade.value);
        
        if(elemBotaoEnvio.innerHTML === "CADASTRAR")
            administrador.adicionar(aluno, elemTabela);
        else if(elemBotaoEnvio.innerHTML === "ATUALIZAR"){
            aluno.id = index;
            administrador.atualizar(aluno);
        }
            
        //administrador.salvar();
        administrador.mostrarAluno(elemTabela);
    }

    
    return false;
}

function remover(indice){

        /*administrador.listaAlunos.splice(indice,1);
        administrador.mostrarAluno(elemTabela);
        administrador.salvar();*/
        administrador.remover(indice, elemTabela);
    
}

function editar(indice){
    fetch('http://localhost:8080/alunos/' + indice).then((resposta) => {
        if(resposta.ok){
            return resposta.json();
        }
    }).then((json) => {
        elemNome = document.querySelector("[data-Nome]");
        elemEmail = document.querySelector("[data-Email]");
        elemCidade = document.querySelector("[data-Cidade]");
        elemData = document.querySelector("[data-Data]");
        elemRA = document.querySelector("[data-RA]");
        elemCurso = document.querySelector("[data-Curso]");

        elemNome.value = json.nome;
        elemEmail.value = json.email;
        elemCidade.value = json.cidade;
        elemData.value = json.data;
        elemRA.value = json.ra;
        elemCurso.value = json.curso;
        index = json.id;
        

        //GOSTANDO
        elemLabSim = document.querySelector("[data-LabSim]");
        elemLabNao = document.querySelector("[data-LabNao]");

        elemRadioSim = document.querySelector("[data-LabSim]");
        elemRadioNao = document.querySelector("[data-LabNao]");

        elemLabSim.className = "btn btn-outline-danger";
        elemLabNao.className = "btn btn-outline-danger";

        elemRadioSim.checked = false;
        elemRadioNao.checked = false;

        if(json.gosto === "SIM"){

            elemLabSim.className = "btn btn-outline-danger active";
            elemRadioSim.checked = true;
        }
        else{

            elemLabNao.className = "btn btn-outline-danger active";
            elemRadioNao.checked = true;
        }

        //DIFICULDADE
        elemLabFacil = document.querySelector("[data-LabFacil]");
        elemLabMediana = document.querySelector("[data-LabMediana]");
        elemLabDificil = document.querySelector("[data-LabDificil]");

        elemRadioFacil = document.querySelector("[data-RadioFacil]");
        elemRadioMediana = document.querySelector("[data-RadioMediana]");
        elemRadioDificil = document.querySelector("[data-RadioDificil]");

        elemLabFacil.className = "btn btn-outline-danger";
        elemLabMediana.className = "btn btn-outline-danger";
        elemLabDificil.className = "btn btn-outline-danger";

        elemRadioFacil.checked = false;
        elemRadioMediana.checked = false;
        elemRadioDificil.checked = false;

        if(json.dificuldade === "FACIL"){

            elemLabFacil.className = "btn btn-outline-danger active";
            elemRadioFacil.checked = true;
        }
        else if(json.dificuldade === "MEDIANA"){

            elemLabMediana.className = "btn btn-outline-danger active";
            elemRadioMediana.checked = true;
        }
        else{

            elemLabDificil.className = "btn btn-outline-danger active";
            elemRadioDificil.checked = true;
        }

        elemBotaoEnvio = document.querySelector("[data-btnEnviar]");
        elemBotaoEnvio.innerHTML = "ATUALIZAR";

    });
}

function init(){

    administrador = new gerenciarAlunos();
    //administrador.restaurar(); //RECUPERA ALUNOS
    administrador.mostrarAluno(elemTabela);
}

function tamanhoNome(entrada, tamanho){

    if(entrada.length<tamanho)
        return false;
    else
        return true;
}

function validacao(){

    var flag = true;
    var elemNome = document.querySelector("[data-Nome]");
    Mensagem = document.querySelector("[data-Mensagem]");
    var elemRA = document.querySelector("[data-RA]");
    var elemData = document.querySelector("[data-Data]");
    var validaRA = /^[0-9]*$/;

    var nascimento = new Date(elemData.value);
    var agora = new Date();
    var idade = Math.floor((agora.getTime() - nascimento.getTime()) / (1000*60*60*24*365));

    if(idade<=16){

        Mensagem.className = "alert alert-danger";
        Mensagem.innerHTML = "<strong>ATENÇÃO!</strong> Usuário menor de 16 anos";
        flag = false;
    }

    if(!validaRA.test(elemRA.value)){

        Mensagem.className = "alert alert-danger";
        Mensagem.innerHTML = "<strong>ATENÇÃO!</strong> Digitar somente numeros no RA";
        flag = false;
    }
    
    if(!tamanhoNome(elemNome.value,10)){

        Mensagem.className = "alert alert-danger";
        Mensagem.innerHTML = "<strong>ATENÇÃO!</strong> Nome deve conter pelo menos 10 caracteres";
        flag = false;
    }

    if(flag==true){

        Mensagem.className = "";
        Mensagem.innerHTML = "";
    }

    return flag;
}