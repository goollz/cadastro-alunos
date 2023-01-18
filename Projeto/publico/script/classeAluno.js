//GUSTAVO GARCIA DE CAMPOS 101911130
class Aluno {
    constructor(id, nome, email, cidade, gosto, data, ra, curso, dificuldade) {
        this.id = id;
        this.nome = nome;
        this.email = email;
        this.cidade = cidade;
        this.gosto = gosto;
        this.data = data;
        this.ra = ra;
        this.curso = curso;
        this.dificuldade = dificuldade;
    }
}

class gerenciarAlunos {
    constructor() {
        //this.listaAlunos = []; Alunos serão obtidos a partir do servidor
    }
    adicionar(aluno, elemContainer) {
        //this.listaAlunos.push(aluno);
        fetch('http://localhost:8080/alunos', {
            method: 'POST',
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify(aluno)
        }).then((resposta) => {
            if (resposta.ok) {
                var leitor = resposta.body.getReader();
                leitor.read().then((dado) => {
                    aluno.id = parseInt(String.fromCharCode.apply(null, dado))
                    var linha = document.createElement("tr");
                    linha.innerHTML = "<td>" + aluno.nome + "</td>" +
                        "<td>" + aluno.email + "</td>" +
                        "<td>" + aluno.cidade + "</td>" +
                        "<td>" + aluno.curso + "&nbsp;&nbsp;" +
                        "<button type='button' class='close' aria-label='Close' onclick='remover(" + aluno.id + ")'>" +
                        "<span aria-hidden='true'>&times;</span>" +
                        "</button>" +
                        "</td>";
                    if (!elemContainer.children[0] == undefined) {
                        elemContainer.children[0].tBodies[0].appendChild(linha);
                    }
                    else {
                        window.location.reload();
                    }
                });
            }
        });
    }
    atualizar(aluno) {
        fetch('http://localhost:8080/alunos', {
            method: 'PUT',
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify(aluno)
        }).then((resposta) => {
            if (resposta.ok) {
                alert("Aluno alterado com sucesso !")
                window.location.reload();
            }
        });
    }
    remover(indice, elemContainer) {
        /*for (var indice = 0; indice < this.listaAlunos.length; indice++) {
            if (this.listaAlunos[indice].email == aluno.email) {
                this.listaAlunos.splice(indice, 1);
                break;
            }
        }*/
        fetch('http://localhost:8080/alunos/' + indice, {method:'DELETE'}).then((resposta) => {
            this.mostrarAluno(elemContainer);
        });
    }
    mostrarAluno(elemContainer) {
        elemContainer.innerHTML = "";

        //fetch é um método assíncrono
        //Não garante que a resposta chegará após a execução do método
        //Métodos e declarações seguintes continuam a serem executadas
        //Sem esperar que o método tenha concluído a busca dos recursos
        //Nova alternativa para uso de AJAX
        fetch('http://localhost:8080/alunos', { method: 'GET' }).then((resposta) => {
            if (resposta.ok) {
                return resposta.json();
            }
            else {
                elemContainer.innerHTML = "<p>Não foi possível obter os dados do servidor!</p>"
            }
        }).then((json) => {
            if (json.length == 0)
                elemContainer.innerHTML = "<p>Não há pessoas cadastradas!</p>"
            else {
                //TABELA
                var tabela = document.createElement("table");
                tabela.className = "table table-hover"; //BOOTSTRAP 4;

                //CABEÇALHO DA TABELA
                var cabecalho = document.createElement("thead");
                cabecalho.className = "thead-dark";

                var linha = document.createElement("tr");
                linha.innerHTML = "<th>Nome</th>" +
                    "<th>Email</th>" +
                    "<th>Cidade</th>" +
                    "<th>Curso</th>"+
                    "<th>Ação</th>";
                cabecalho.appendChild(linha);
                tabela.appendChild(cabecalho);

                //CORPO DA TABELA
                var corpo = document.createElement("tbody");

                //INSERIR OS DADOS NO CORPO DA TABELA
                for (var i = 0; i < json.length; i++) {
                    var linha = document.createElement("tr");
                    linha.innerHTML = "<td>" + json[i].nome + "</td>" +
                        "<td>" + json[i].email + "</td>" +
                        "<td>" + json[i].cidade + "</td>" +
                        "<td>" + json[i].curso + "</td>" + /*"&nbsp;&nbsp;" +
                        "<button type='button' class='close' aria-label='Close' onclick='remover(" + json[i].id + ")'>" +
                        "<span aria-hidden='true'>&times;</span>" +
                        "</button>" +
                        "</td>";*/
                        "<td>" +
                        "<button type='button' class='btn btn-danger' onclick='remover(" + json[i].id + ")'>EXCLUIR</button>" +
                        "<button type='button' class='btn btn-info' onclick='editar(" + json[i].id + ")'>EDITAR</button>" + 
                        "</td>";
                    corpo.appendChild(linha);
                }
                tabela.appendChild(corpo);
                elemContainer.appendChild(tabela);
            }
        });
    }//FIM DO MÉTODO MOSTRAR ALUNOS

    /*salvar(){
        localStorage.Aluno = JSON.stringify(this.listaAlunos);
    }
    restaurar(){
        if(localStorage.Aluno != undefined){
            this.listaAlunos = JSON.parse(localStorage.Aluno);
        }
    }*/
}