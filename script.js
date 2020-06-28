    window.indexedDB = window.indexedDB || window.mozIndexedDB || window.webkitIndexedDB || window.msIndexedDB;

    if(!window.indexedDB){

        console.log("Seu navegador não suporta o recurso IndexedDB");

    }else{

        var request = window.indexedDB.open("Pedidos", 3);
        var banco = "computadores";

        request.onsuccess = function(evento){
            console.log("Banco aberto com sucesso!");
            banco = evento.target.result;
            // Puxando função para adquirir os dados
            getDados();
        }

        request.onerror = function(evento){
            console.log("Erro ao chamar pelo banco",evento);
        }

        request.onupgradeneeded = function(evento){
            console.log("Atualizando...");
            banco = evento.target.result;
            
            var objectStore = banco.createObjectStore( "computadores", {keyPath : "codigo", autoIncrement: true});
        };

        // Função para mostrar todos os dados da tabela computadores na tabela do html - Completo
        function getDados(){

            var count = banco.transaction(["computadores"],"readonly").objectStore("computadores").count();
            
            count.onsuccess = function(){
                
                var linhas = count.result;
                var request = banco.transaction(["computadores"],"readonly").objectStore("computadores").getAll();
                
                if(linhas != 0){

                    request.onsuccess = function(){
                        var pedido = request.result;
                        var tabela = document.getElementById("tabelaGeral");
    
                        for (var i = 0; i < linhas; i++){
                            // Criando as linhas e celulas
                            var row = tabela.insertRow(-1);
                            row.className= "Linhas";

                            var cell1 = row.insertCell(-1);
                            var cell2 = row.insertCell(-1);
                            var cell3 = row.insertCell(-1);
                            var cell4 = row.insertCell(-1);
                            var cell5 = row.insertCell(-1);
                            var cell6 = row.insertCell(-1);
                            var cell7 = row.insertCell(-1);
                            var cell8 = row.insertCell(-1);
                            var cell9 = row.insertCell(-1);
                            var cell10 = row.insertCell(-1);
                            var cell11 = row.insertCell(-1);
                            var cell12 = row.insertCell(-1);
                            var cell13 = row.insertCell(-1);

                            // Inserindo os valores
                            cell1.innerHTML = pedido[i].codigo;
                            cell2.innerHTML = pedido[i].marcaP;
                            cell3.innerHTML = pedido[i].velocidadeP;
                            cell4.innerHTML = pedido[i].marcaPM;
                            cell5.innerHTML = pedido[i].modeloPM;
                            cell6.innerHTML = pedido[i].quantidaderam;
                            cell7.innerHTML = pedido[i].capacidaderam;
                            cell8.innerHTML = pedido[i].quantidadehd;
                            cell9.innerHTML = pedido[i].capacidadehd;
                            cell10.innerHTML = pedido[i].marcafe;
                            cell11.innerHTML = pedido[i].modelofe;

                            // Inserindo os botões de editar e excluir
                            cell12.innerHTML = "<p class='acao btn' id='alterar' onclick='formAlterar(" + pedido[i].codigo + ")'> Alterar </p>";
                            cell13.innerHTML = "<p class='acao btn' id='excluir' onclick='deletar(" + pedido[i].codigo + ")'> Excluir </p>";
                        }
                    }
                
                }else{
                    console.log("Tabela sem dados");
                }
            }
        }

        // Função para cadastro do produto/pedido - Completo
        function cadastro(){

            // variáveis pegando valor do formulário pelo Id
            var codigo = document.getElementById("codigo").value;
            var fMarcaP = document.getElementById("fMarcaP").value;
            var fVelocidadeP = document.getElementById("fVelocidadeP").value;
            var fMarcaPM = document.getElementById("fMarcaPM").value;
            var fModeloPM = document.getElementById("fModeloPM").value;
            var fQuantidadeRam = document.getElementById("fQuantidadeRam").value;
            var fCapacidadeRam = document.getElementById("fCapacidadeRam").value;
            var fQuantidadeHd = document.getElementById("fQuantidadeHd").value;
            var fCapacidadeHd = document.getElementById("fCapacidadeHd").value;
            var fMarcaFE = document.getElementById("fMarcaFE").value;
            var fModeloFE = document.getElementById("fModeloFE").value;
            
            // Iniciando gravação no banco
            var transaction = banco.transaction(["computadores"],"readwrite");

            transaction.oncomplete = function(event){
                console.log("Sucesso :)");
                alert("Adicionado com Sucesso. A página será recarregada!");
                document.location.reload(true);
            };

            transaction.onerror = function(event){
                console.log("Erro :(");
                alert("Erro ao Adicionar produto");
            };

            var objectStore = transaction.objectStore("computadores");
                    
            // Gravando no Banco
            objectStore.add({marcaP : fMarcaP, velocidadeP: fVelocidadeP, marcaPM: fMarcaPM, modeloPM: fModeloPM, quantidaderam: fQuantidadeRam, capacidaderam: fCapacidadeRam, quantidadehd: fQuantidadeHd, capacidadehd: fCapacidadeHd, marcafe: fMarcaFE, modelofe: fModeloFE});
            
        }
        
        
        // Função para salvar os dados editados no banco - 50% feito falta passar os dados para alterar
        function alterar(){

            // Variáveis par alteracao
            var codigo = document.getElementById("codigo").value;

            var transaction = banco.transaction(["computadores"],"readwrite");
        
            transaction.oncomplete = function(event){
                console.log("Sucesso :)");
            };
        
            transaction.onerror = function(event){
                console.log("Erro :(");
            };
        
            var objectStore = transaction.objectStore("computadores");
            
            // Processo para a alteração
            var request = objectStore.get(parseInt(codigo));

            request.onsuccess = function(event){
                // Alterando dados
                request.result.marcaP = document.getElementById("fMarcaP").value;
                request.result.velocidadeP = document.getElementById("fVelocidadeP").value;
                request.result.marcaPM = document.getElementById("fMarcaPM").value;
                request.result.modeloPM = document.getElementById("fModeloPM").value;
                request.result.quantidaderam = document.getElementById("fQuantidadeRam").value;
                request.result.capacidaderam = document.getElementById("fCapacidadeRam").value;
                request.result.quantidadehd = document.getElementById("fQuantidadeHd").value;
                request.result.capacidadehd = document.getElementById("fCapacidadeHd").value;
                request.result.marcafe = document.getElementById("fMarcaFE").value;
                request.result.modelofe = document.getElementById("fModeloFE").value;

                // Inserindo dados alterados
                objectStore.put(request.result);
                alert("Dados Alterados. A página será recarregada");
                document.location.reload(true);
            }
        }

        function botao(){

            var acao = document.getElementById("acao").value;
            var form = document.getElementById("formulario");

            // Processador
            if(form.fMarcaP.value == "" || form.fMarcaP.value == null){
                alert("Por favor insira a marca do seu processador!");
            }else if(form.fVelocidadeP.value == "" || form.fVelocidadeP.value == null){
                alert("Por favor insira a velocidade do seu processador!");
            }else
            // Placa-mãe
            if(form.fMarcaPM.value == "" || form.fMarcaPM.value == null){
                alert("Por favor insira a marca da sua Placa-Mãe!");
            }else if(form.fModeloPM.value == "" || form.fModeloPM.value == null){
                alert("Por favor insira o modelo da sua Placa-Mãe!");
            }else 
            // Fonte de Energia
            if(form.fMarcaFE.value == "" || form.fMarcaFE.value == null){
                alert("Por favor insira a marca da sua Fonte de Energia!");
            }else if(form.fModeloFE.value == "" || form.fModeloFE.value == null){
                alert("Por favor insira o modelo da sua Fonte de Energia!");
            }else 
            // Memória Ram
            if(form.fQuantidadeRam.value == "" || form.fQuantidadeRam.value == null){
                alert("Por favor insira quantas memórias Ram que a máquina possui!");
            }else if(form.fCapacidadeRam.value == "" || form.fCapacidadeRam.value == null){
                alert("Por favor insira a capacidade(4,8,16g) das memórias Ram que a máquina possui! !");
            }else 
            // HD
            if(form.fQuantidadeHd.value == "" || form.fQuantidadeHd.value == null){
                alert("Por favor insira quantos Hd's a máquina possui!");
            }else if(form.fCapacidadeHd.value == "" || form.fCapacidadeHd.value == null){
                alert("Por favor insira a capacidade(500g,1T) dos Hd's que a máquina possui!");
            }else 
            // ação a ser feita
            if(acao == "cadastrar"){
                cadastro();
            }else if(acao == "alterar"){
                alterar();
            }
        }

        // Função para apagar os dados do banco - Completo
        function deletar(codigo){

            var transaction = banco.transaction(["computadores"],"readwrite");
        
            transaction.oncomplete = function(event){
                console.log("Sucesso :)");
            };
        
            transaction.onerror = function(event){
                console.log("Erro :(");
            };
        
            var objectStore = transaction.objectStore("computadores");

            // Comfirmar a exclusão do dado
            var comfirmacao = confirm("Deseja excluir essa linha?");

            if(comfirmacao){
                // Processo para a exclusão
                var request = objectStore.delete(codigo);
                request.onsuccess = function(event){
                console.log("Linha deletada");
                    alert("Linha deletada com sucesso, a página será recarregada!");
                    document.location.reload(true);  
                }
            }else{
                // Não fazer nada.
            }   
        }

        function formAlterar(codigo){

            var transaction = banco.transaction(["computadores"],"readwrite");
        
            transaction.oncomplete = function(event){
                console.log("Sucesso :)");
            };
        
            transaction.onerror = function(event){
                console.log("Erro :(");
            };
        
            var objectStore = transaction.objectStore("computadores");
            
            // Processo para a alteração
            var request = objectStore.get(codigo);
            request.onsuccess = function(event){
                document.getElementById("codigo").value = request.result.codigo;
                document.getElementById("fMarcaP").value = request.result.marcaP;
                document.getElementById("fVelocidadeP").value = request.result.velocidadeP;
                document.getElementById("fMarcaPM").value = request.result.marcaPM;
                document.getElementById("fModeloPM").value = request.result.modeloPM;
                document.getElementById("fQuantidadeRam").value = request.result.quantidaderam;
                document.getElementById("fCapacidadeRam").value = request.result.capacidaderam;
                document.getElementById("fQuantidadeHd").value = request.result.quantidadehd;
                document.getElementById("fCapacidadeHd").value = request.result.capacidadehd;
                document.getElementById("fMarcaFE").value = request.result.marcafe;
                document.getElementById("fModeloFE").value = request.result.modelofe;
                document.getElementById("acao").value = "alterar";
            }
        }

        //Busca pelo código do produto
        function busca(){

            var busca, filtro, tabela, linha, celula, texto;

            busca = document.getElementById("fBusca");
            filtro = busca.value.toUpperCase();

            tabela = document.getElementById('tabelaGeral');
            linha = tabela.getElementsByTagName('tr');

            for(var i = 1; i < linha.length; i++){

                celula = linha[i].getElementsByTagName('td')[0];

                if(celula){
                    texto = celula.textContent || celula.innerText;
                    
                    if(texto.toUpperCase().indexOf(filtro) > -1){
                        linha[i].style.display = "";
                    }else{
                        linha[i].style.display = "none";
                    }
                }
            }
        }

    // chave do else não apagar
    }