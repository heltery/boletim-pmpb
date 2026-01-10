function gerarCamposGU() {
  let qtd = document.getElementById("qtdGU").value;
  let container = document.getElementById("formEquipes");
  container.innerHTML = ""; // limpa antes de gerar

  for (let i = 1; i <= qtd; i++) {
    container.innerHTML += `
      <h3>Guarnição ${i}</h3>
      <input type="text" id="guarnicao${i}" placeholder="NomeGuarnição"><br>
      <input type="text" id="vtr${i}" placeholder="VTR"><br><br>
      <input type="text" id="cmd${i}" placeholder="Comandante"><br>
      <input type="text" id="mot${i}" placeholder="Motorista"><br>
      <input type="text" id="pat1${i}" placeholder="Patrulheiro 01"><br>
      <input type="text" id="pat2${i}" placeholder="Patrulheiro 02"><br>
      `;
  }
}


function gerarCamposACUSADO() {
  let qtdACUSADO = document.getElementById("qtdACUSADO").value;
  let container2 = document.getElementById("formACUSADO");
  container2.innerHTML = ""; // limpa antes de gerar

  for (let i = 1; i <= qtdACUSADO; i++) {
    container2.innerHTML += `
      <h3>Envolvido / Suspeito ${i}</h3>

      <input type="text" id="nome_acusado${i}" placeholder="Nome Envolvido / Suspeito"><br>
      <input type="date" id="DataNascimento${i}" placeholder="Data de Nascimento"><br>
      <input type="text" id="Genitora${i}" placeholder="Genitora"><br>
      <input type="text" id="RG${i}" placeholder="RG"><br>
      <input type="text" id="CPF${i}" placeholder="CPF"><br>
      <input type="text" id="Endereço${i}" placeholder="Endereço"><br>
      <input type="text" id="Profissao${i}" placeholder="Profissão"><br>
      <input type="text" id="CNH${i}" placeholder="CNH"><br>

      <h4>Informações sobre caracteristicas fisicas:</h4><br>

      <select id="CorPele${i}">
          <option value="">Cor da Pele ...</option>
          <option value="Branco">Branco</option>
          <option value="Pardo">Pardo</option>
          <option value="Negro">Negro</option>
          <option value="Indio">Indio</option>
      </select><br>

      <select id="compleicaoFisica${i}">
          <option value="">Compleição Fisica ...</option>
          <option value="Magro">Magro</option>
          <option value="Atlético">Atlético</option>
          <option value="Forte">Forte</option>
          <option value="Obeso">Obeso</option>
      </select><br>

      <input type="text" id="corCabelo${i}" placeholder="Cor do Cabelo"><br>
      <input type="text" id="corOlhos${i}" placeholder="Cor dos Olhos"><br>
      <input type="text" id="altura${i}" placeholder="Altura Aproximada"><br>
      <input type="text" id="MarcasCaracteristicas${i}" placeholder="Marcas / Caracteristicas Pessoais"><br>
      `;
  }
}


function gerarCamposVitima() {
  let qtdVitima = document.getElementById("qtdVitima").value;
  let container2 = document.getElementById("formVitima");
  container2.innerHTML = ""; // limpa antes de gerar

  for (let i = 1; i <= qtdVitima; i++) {
    container2.innerHTML += `
      <h3>Vitima ${i}</h3>

      <input type="text" id="nome${i}" placeholder="Nome Vitima"><br>
      <input type="date" id="dataNascimento${i}" placeholder="Data de Nascimento"><br>
      <input type="text" id="genitora${i}" placeholder="Genitora"><br>
      <input type="text" id="rg${i}" placeholder="RG"><br>
      <input type="text" id="cpf${i}" placeholder="CPF"><br>
      <input type="text" id="endereço${i}" placeholder="Endereço"><br>
      <input type="text" id="profissao${i}" placeholder="Profissão"><br>
      <input type="text" id="telefone${i}" placeholder="Telefone"><br>
      `;
  }
}


function gerarCamposTestemunha() {
  let qtdTestemunha = document.getElementById("qtdTestemunha").value;
  let container2 = document.getElementById("formTestemunha");
  container2.innerHTML = ""; // limpa antes de gerar

  for (let i = 1; i <= qtdTestemunha; i++) {
    container2.innerHTML += `
      <h3>Testemunha ${i}</h3>

      <input type="text" id="nome${i}" placeholder="Nome Testemunha"><br>
      <input type="date" id="dataNascimento${i}" placeholder="Data de Nascimento"><br>
      <input type="text" id="genitora${i}" placeholder="Genitora"><br>
      <input type="text" id="rg${i}" placeholder="RG"><br>
      <input type="text" id="cpf${i}" placeholder="CPF"><br>
      <input type="text" id="endereço${i}" placeholder="Endereço"><br>
      <input type="text" id="profissao${i}" placeholder="Profissão"><br>
      <input type="text" id="telefone${i}" placeholder="Telefone"><br>
      `;
  }
}


function obterNomesAcusados() {
  let qtd = parseInt(document.getElementById("qtdACUSADO").value);
  let nomes = [];

  for (let i = 1; i <= qtd; i++) {
    let campo = document.getElementById(`nome_acusado${i}`);
    if (campo && campo.value.trim() !== "") {
      nomes.push(campo.value.trim());
    }
  }

  return nomes;
}







// FUNÇÃO PARA GERAR O ARQUIVO PDF ----------------------------------------------------------------------
function gerarPDF() {
  const { jsPDF } = window.jspdf;
  const doc = new jsPDF("p", "mm", "a4");

  //CRIANDO UMA MARGEM DE SGURANÇA PARA PAGINA
  const pageWidth = doc.internal.pageSize.getWidth();
  const pageHeight = doc.internal.pageSize.getHeight();
  const marginBottom = 15; // margem de segurança
  //-------------------------------------------

   let y = 25;

  //função para quebrar pagina
  function verificarQuebraPagina(espaco = 10) {
    if (y + espaco >= pageHeight - marginBottom) {
      doc.addPage();
      y = 25;
    }
  }
  //--------------------------------------------------


  //FUNÇÃO PARA CRIAR TITULO
  function tituloSecao(texto) {

  verificarQuebraPagina(15); // garante espaço para o título

  y += 2;
  doc.setFont("Times", "bold");
  doc.line(15, y, pageWidth - 15, y);
  let tituloFormatado = "---------- " + texto + " ----------";
  let textWidth = doc.getTextWidth(tituloFormatado);
  y += 5;
  doc.text(tituloFormatado, (pageWidth - textWidth) / 2, y);
  y += 2;
  doc.line(15, y, pageWidth - 15, y);
  doc.setFont("Times", "normal");
  y += 5;
}
//----------------------------------------------------------

function blocoTexto(titulo, texto) {

  if (!texto || texto.trim() === "") {
    texto = "Nada consta.";
  }

  const margem = 15;
  const larguraCaixa = pageWidth - margem * 2;
  const alturaLinha = 5;

  // quebra texto respeitando a largura da caixa
  let linhas = doc.splitTextToSize(texto, larguraCaixa - 4);

  // calcula altura total da caixa
  let alturaTexto = linhas.length * alturaLinha;
  let alturaTotal = alturaTexto + 8; // padding interno

  verificarQuebraPagina(alturaTotal + 15);

  // ----- título -----
  doc.setFont("Times", "bold");
  doc.text(titulo, pageWidth / 2, y, { align: "center" });
  y += 2;
  doc.line(margem, y, pageWidth - margem, y);
  y += 4;

  // ----- caixa -----
  doc.setFont("Times", "normal");

  // desenha o retângulo
  doc.rect(margem, y, larguraCaixa, alturaTotal);

  // escreve o texto dentro da caixa
  doc.text(linhas, margem + 2, y + 6);

  // move y para depois da caixa
  y += alturaTotal + 6;
}



// A PARTIR DAQUI COMEÇAMOS A CONSTRUIR O PDF POR PARTES
// -----------------------------------------------------
//------------------------------------------------------
//------------------------------------------------------
//------------------------------------------------------
//------------------------------------------------------


  //------------------ CABEÇALHO -------------------------
  // Pega as imagens já carregadas no HTML
  let imgLeft = document.getElementById("logoEsquerda");
  let imgRight = document.getElementById("logoDireita");
  // Adiciona no PDF
  doc.addImage(imgLeft, "PNG", 15, 5, 30, 18); // canto superior esquerdo
  doc.addImage(imgRight, "PNG", pageWidth - 30, 5, 20, 20); // canto superior direito
  // Centralizar título
  doc.setFont("Times", "bold");
  doc.setFontSize(12);
  let titulo1 = "ESTADO DA PARAÍBA - POLÍCIA MILITAR";
  let textWidth1 = doc.getTextWidth(titulo1);
  doc.text(titulo1, (pageWidth - textWidth1) / 2, 10);
  let titulo2 = "BOLETIM DE OCORRÊNCIA";
  let textWidth2 = doc.getTextWidth(titulo2);
  doc.text(titulo2, (pageWidth - textWidth2) / 2, 20);
  //-----------------------------------------------------
  doc.setFont("Times", "normal");
  doc.setFontSize(10);



  // ------------------ DADOS DA OCORRENCIA -------------------------
  //tituloSecao("DADOS DA OCORRENCIA");
  
  //primeiro carregar os dados inseridos pelo usuario
  let uop = document.getElementById("uop").value;
  let numeroCICC = document.getElementById("numeroCICC").value;
  let data = document.getElementById("data").value;
  let hora = document.getElementById("hora").value;
  let endereco = document.getElementById("endereco").value;
  let numeroEndereco = document.getElementById("numeroEndereco").value;
  let pontoReferencia = document.getElementById("pontoReferencia").value;
  let natureza = document.getElementById("natureza").value;
  let codigo = document.getElementById("codigo").value;
  //agora colocar no PDF
  //LINHA 1
  doc.line(15, y, pageWidth - 15, y);
  y+=5;
  doc.text("UOp/SUOp:", 15, y);
  doc.text("Data da Ocorrência:", 55, y);
  doc.text("Hora:", 115, y);
  doc.text("Nº ficha CICC:", 160, y);

  y+=5;
  doc.text(uop, 12, y)
  doc.text(data, 60, y)
  doc.text(hora, 114, y);
  doc.text(numeroCICC, 158, y);
  //LINHA 2
  y+=2
  doc.line(15, y, pageWidth - 15, y);
  y+=5;
  doc.text("Endereço:", 15, y);
  doc.text("Nº:", 170, y);
  
  y+=5;
  doc.text(endereco, 15 , y);
  doc.text(numeroEndereco, 169, y);
  //LINHA 3
  y+=2;
  doc.line(15, y, pageWidth - 15, y);
  y+=5;
  doc.text("Ponto de Referência:", 15, y);

  y+=5;
  doc.text(pontoReferencia, 15, y);
  //LINHA 4
  y+=2;
  doc.line(15, y, pageWidth - 15, y);
  y+=5;
  doc.text("Natureza da Ocorrência:", 15, y);
  doc.text("Código:", 165, y);
  
  y+=5;
  doc.text(natureza, 15, y);
  doc.text(codigo, 169, y);
  //----------------------------------------------------------


  // ------------------ DADOS SOLICITANTE -------------------------
  tituloSecao("DADOS DO(A) SOLICITANTE");

  let solicitante = document.getElementById("solicitante").value;
  let telefone = document.getElementById("telefone").value;
  let enderecoSolic = document.getElementById("enderecoSolic").value;

  // LINHA 1
  doc.text("Solicitante:", 15, y);
  doc.text("Telefone:", 160, y);

  y+=5;
  doc.text(solicitante, 15, y);
  doc.text(telefone, 160, y);
  // LINHA 2
  y+=2;
  doc.line(15, y, pageWidth - 15, y);
  y+=5;
  doc.text("Endereço solicitante:", 15, y);
  
  y+=5;
  doc.text(enderecoSolic, 15, y);
  //-------------------------------------------------------------------


  //------------------ DADOS GUARNIÇÕES ------------------------- 

  tituloSecao("DADOS DA(S) GUARNIÇÃO(ÕES)");

  let qtd = document.getElementById("qtdGU").value;
  
  for (let i = 1; i <= qtd; i++) {

    verificarQuebraPagina(35);

    doc.setFont("Times", "bold");
    let titulo5 = "GUARNIÇÃO " + i;
    let textWidth5 = doc.getTextWidth(titulo5);
    doc.text(titulo5, (pageWidth - textWidth5) / 2, y);
    y+=2;
    doc.line(15, y, pageWidth - 15, y);
    doc.setFont("Times", "normal");

    let guarnicao = document.getElementById("guarnicao" + i).value;
    let cmd = document.getElementById("cmd" + i).value;
    let mot = document.getElementById("mot" + i).value;
    let pat1 = document.getElementById("pat1" + i).value;
    let pat2 = document.getElementById("pat2" + i).value;
    let vtr = document.getElementById("vtr" + i).value;

    y+=5;
    doc.text("Guarnição:", 15, y);
    doc.text("Viatura:", 100, y); 
    doc.text("Comandante:", 160, y);
    y += 5;
    doc.text(guarnicao, 15, y);
    doc.text(vtr, 100, y);
    doc.text(cmd, 160, y);
    y+=2;
    doc.line(15, y, pageWidth - 15, y);
    
    y+=5;
    doc.text("Motorista:", 15, y);
    doc.text("Patrulheiro 01:", 95, y);
    doc.text("Patrulheiro 02:", 155, y);
    y+=5;
    doc.text(mot, 15, y);
    doc.text(pat1, 95, y);
    doc.text(pat2, 155, y);
    y+=2;
    doc.line(15, y, pageWidth - 15, y);
    y+=5;
       
  }
  //------------------------------------------------------------


  // ------------------ DADOS ACUSADOS -------------------------
  
  tituloSecao("DADOS DO(A) ACUSADO(S)");

  let qtdAcusado = document.getElementById("qtdACUSADO").value;

  for (let i = 1; i <= qtdAcusado; i++) {

    verificarQuebraPagina(60); // bloco grande

      doc.setFont("Times", "bold");
      let titulo7 = "ENVOLVIDO/SUSPEITO " + i;
      let textWidth7 = doc.getTextWidth(titulo7);
      doc.text(titulo7, (pageWidth - textWidth7) / 2, y);
      y+=2;
      doc.line(15, y, pageWidth - 15, y);
      doc.setFont("Times", "normal");

      let acusado = document.getElementById("nome_acusado" + i).value;
      let nascAcusado = document.getElementById("DataNascimento" + i).value;
      let genitora = document.getElementById("Genitora" + i).value;
      let rg = document.getElementById("RG" + i).value;
      let cpf = document.getElementById("CPF" + i).value;
      let endereco = document.getElementById("Endereço" + i).value;
      let profissao = document.getElementById("Profissao" + i).value;
      let cnh = document.getElementById("CNH" + i).value;
      let pele = document.getElementById("CorPele" + i).value;
      let fisico = document.getElementById("compleicaoFisica" + i).value;
      let cabelo = document.getElementById("corCabelo" + i).value;
      let olhos = document.getElementById("corOlhos" + i).value;
      let altura = document.getElementById("altura" + i).value;
      let marcas = document.getElementById("MarcasCaracteristicas" + i).value;

      y+=5;
      doc.text("Nome:", 15, y);
      doc.text("Data de Nascimento:", 95, y); 
      doc.text("CPF:", 155, y);
      y += 5;
      doc.text(acusado, 15, y);
      doc.text(nascAcusado, 95, y);
      doc.text(cpf, 155, y);
      y+=2;
      doc.line(15, y, pageWidth - 15, y);
      
      y+=5;
      doc.text("Genitora:", 15, y);
      doc.text("RG:", 95, y);
      doc.text("CNH:", 155, y);
      y+=5;
      doc.text(genitora, 15, y);
      doc.text(rg, 95, y);
      doc.text(cnh, 155, y);
      y+=2;
      doc.line(15, y, pageWidth - 15, y);
      y+=5;

      doc.text("Endereço:", 15, y);
      doc.text("Profissão:", 155, y);
      y+=5;
      doc.text(endereco, 15, y);
      doc.text(profissao, 155, y);
      y+=2;
      doc.line(15, y, pageWidth - 15, y);
      y+=5;

      doc.text("Cor da Pele:", 15, y);
      doc.text("Cor dos Olhos:", 95, y);
      doc.text("Cor do Cabelo:", 155, y);
      y+=5;
      doc.text(pele, 15, y);
      doc.text(olhos, 95, y);
      doc.text(cabelo, 155, y);
      y+=2;
      doc.line(15, y, pageWidth - 15, y);
      y+=5;

      doc.text("Compleição Fisica:", 15, y);
      doc.text("Altura:", 95, y);
      doc.text("Marcas Caracteristicas:", 155, y);
      y+=5;
      doc.text(fisico, 15, y);
      doc.text(altura, 95, y);
      doc.text(marcas, 155, y);
      y+=2;
      doc.line(15, y, pageWidth - 15, y);
      y+=5;

      

  }
//-----------------------------------------------------------


// ------------------ DADOS VITIMAS -------------------------
  
  tituloSecao("DADOS DA(S) VITIMA(S)");

  let qtdVitima = document.getElementById("qtdVitima").value;

  for (let i = 1; i <= qtdVitima; i++) {

    verificarQuebraPagina(40); // bloco grande

      doc.setFont("Times", "bold");
      let titulo7 = "VITIMA " + i;
      let textWidth7 = doc.getTextWidth(titulo7);
      doc.text(titulo7, (pageWidth - textWidth7) / 2, y);
      y+=2;
      doc.line(15, y, pageWidth - 15, y);
      doc.setFont("Times", "normal");

      
      let vitima = document.getElementById("nome" + i).value;
      let nascimento = document.getElementById("dataNascimento" + i).value;
      let genitora = document.getElementById("genitora" + i).value;
      let rg = document.getElementById("rg" + i).value;
      let cpf = document.getElementById("cpf" + i).value;
      let endereco = document.getElementById("endereço" + i).value;
      let telefone = document.getElementById("telefone" + i).value;
      let profissao = document.getElementById("Profissao" + i).value;
      
      y+=5;
      doc.text("Nome:", 15, y);
      doc.text("Data de Nascimento:", 95, y); 
      doc.text("CPF:", 155, y);
      y += 5;
      doc.text(vitima, 15, y);
      doc.text(nascimento, 95, y);
      doc.text(cpf, 155, y);
      y+=2;
      doc.line(15, y, pageWidth - 15, y);
      
      y+=5;
      doc.text("Genitora:", 15, y);
      doc.text("RG:", 95, y);
      doc.text("Telefone:", 155, y);
      y+=5;
      doc.text(genitora, 15, y);
      doc.text(rg, 95, y);
      doc.text(telefone, 155, y);
      y+=2;
      doc.line(15, y, pageWidth - 15, y);
      y+=5;

      doc.text("Endereço:", 15, y);
      doc.text("Profissão:", 155, y);
      y+=5;
      doc.text(endereco, 15, y);
      doc.text(profissao, 155, y);
      y+=2;
      doc.line(15, y, pageWidth - 15, y);
      y+=5;  
   }
  
//----------------------------------------------------------------


// ------------------ DADOS TESTEMUNHAS -------------------------
  
  tituloSecao("DADOS DA(S) TESTEMUNHA(S)");

  let qtdTestemunha = document.getElementById("qtdTestemunha").value;

  for (let i = 1; i <= qtdTestemunha; i++) {

    verificarQuebraPagina(40); // bloco grande

      doc.setFont("Times", "bold");
      let titulo8 = "TESTEMUNHA " + i;
      let textWidth8 = doc.getTextWidth(titulo8);
      doc.text(titulo8, (pageWidth - textWidth8) / 2, y);
      y+=2;
      doc.line(15, y, pageWidth - 15, y);
      doc.setFont("Times", "normal");

      
      let testemunha = document.getElementById("nome" + i).value;
      let nascimento = document.getElementById("dataNascimento" + i).value;
      let genitora = document.getElementById("genitora" + i).value;
      let rg = document.getElementById("rg" + i).value;
      let cpf = document.getElementById("cpf" + i).value;
      let endereco = document.getElementById("endereço" + i).value;
      let telefone = document.getElementById("telefone" + i).value;
      let profissao = document.getElementById("profissao" + i).value;
      
      y+=5;
      doc.text("Nome:", 15, y);
      doc.text("Data de Nascimento:", 95, y); 
      doc.text("CPF:", 155, y);
      y += 5;
      doc.text(testemunha, 15, y);
      doc.text(nascimento, 95, y);
      doc.text(cpf, 155, y);
      y+=2;
      doc.line(15, y, pageWidth - 15, y);
      
      y+=5;
      doc.text("Genitora:", 15, y);
      doc.text("RG:", 95, y);
      doc.text("Telefone:", 155, y);
      y+=5;
      doc.text(genitora, 15, y);
      doc.text(rg, 95, y);
      doc.text(telefone, 155, y);
      y+=2;
      doc.line(15, y, pageWidth - 15, y);
      y+=5;

      doc.text("Endereço:", 15, y);
      doc.text("Profissão:", 155, y);
      y+=5;
      doc.text(endereco, 15, y);
      doc.text(profissao, 155, y);
      y+=2;
      doc.line(15, y, pageWidth - 15, y);
      y+=5;  

      
   }
  
//----------------------------------------------------------------


// ------------------ MATERIAL APREENDIDO -------------------------
tituloSecao("MATERIAIS APREENDIDOS");

blocoTexto("ARMAS DE FOGO E MUNIÇÕES", document.getElementById("arma").value);
blocoTexto("DROGAS", document.getElementById("droga").value);
blocoTexto("OUTROS MATERIAIS", document.getElementById("outros").value);
//----------------------------------------------------------------



// ------------------ RELATO -------------------------
tituloSecao("RELATO DA OCORRENCIA");

blocoTexto("", document.getElementById("relato").value);
//----------------------------------------------------------------



// ------------------ AUTO DE RESISTENCIA -------------------------
function textoAutoResistencia(nomes) {

  let sujeito =
    nomes.length === 1
      ? `o nacional ${nomes[0]}`
      : `os nacionais ${nomes.join(", ")}`;

  let verbo = nomes.length === 1 ? "ofereceu" : "ofereceram";

  return `
CONSTA QUE, no momento da intervenção policial, ${sujeito}, ao receber ordem legal para cessar sua conduta e submeter-se à abordagem, ${verbo} resistência ativa à ação policial, sendo necessário o emprego proporcional da força para conter a injusta agressão e garantir a segurança da guarnição e de terceiros.

O uso da força deu-se em estrita observância aos princípios da legalidade, necessidade, proporcionalidade e moderação, conforme preconizam as normas técnicas e operacionais vigentes, cessando imediatamente após a contenção da resistência, sem que houvesse excesso por parte da equipe policial.
  `.trim();
}
let usoForca = document.querySelector('input[name="usoForca"]:checked').value;
if (usoForca === "sim") {

  let nomesAcusados = obterNomesAcusados();

  if (nomesAcusados.length === 0) {
      nomesAcusados.push("");
  }

  tituloSecao("AUTO DE RESISTÊNCIA");

  let textoAuto = textoAutoResistencia(nomesAcusados);

  blocoTexto("", textoAuto);
}
//----------------------------------------------------------------


// ------------------ ASSINATURAS -------------------------
function secaoAssinaturas() {

  verificarQuebraPagina(120);

  const margem = 15;
  const largura = pageWidth - margem * 2;

  // -------- TÍTULO --------
  doc.setFont("Times", "bold");
  doc.text("ASSINATURAS", pageWidth / 2, y, { align: "center" });
  y += 2;
  doc.line(margem, y, pageWidth - margem, y);
  y += 10;

  doc.setFont("Times", "normal");

  // -------- CAMPOS --------
  doc.text("Condutor:", margem, y);
  doc.line(margem + 22, y + 1, pageWidth - margem - 40, y + 1);
  doc.text("Data:", pageWidth - margem - 35, y);
  doc.line(pageWidth - margem - 25, y + 1, pageWidth - margem, y + 1);
  y += 12;

  doc.text("Testemunha 01:", margem, y);
  doc.line(margem + 35, y + 1, pageWidth - margem - 40, y + 1);
  doc.text("Data:", pageWidth - margem - 35, y);
  doc.line(pageWidth - margem - 25, y + 1, pageWidth - margem, y + 1);
  y += 12;

  doc.text("Testemunha 02:", margem, y);
  doc.line(margem + 35, y + 1, pageWidth - margem - 40, y + 1);
  doc.text("Data:", pageWidth - margem - 35, y);
  doc.line(pageWidth - margem - 25, y + 1, pageWidth - margem, y + 1);
  y += 18;

  // -------- RECEBIMENTO --------
  doc.setFont("Times", "bold");
  doc.text("RECEBIMENTO – POLÍCIA CIVIL", pageWidth / 2, y, { align: "center" });
  y += 2;
  doc.line(margem, y, pageWidth - margem, y);
  y += 6;

  const alturaCaixa = 45;

  doc.rect(margem, y, largura, alturaCaixa);

  doc.setFont("Times", "normal");

  doc.text("Data e hora do recebimento:", margem + 2, y + 8);
  doc.line(margem + 60, y + 9, pageWidth - margem - 2, y + 9);

  doc.text("Nome do recebedor:", margem + 2, y + 18);
  doc.line(margem + 42, y + 19, pageWidth - margem - 2, y + 19);

  doc.text("Matrícula:", margem + 2, y + 28);
  doc.line(margem + 28, y + 29, margem + 80, y + 29);

  doc.text("Assinatura:", margem + 85, y + 28);
  doc.line(margem + 115, y + 29, pageWidth - margem - 2, y + 29);

  y += alturaCaixa + 10;
}
secaoAssinaturas();
//----------------------------------------------------------------







  // Abre o PDF em nova aba sem salvar
      window.open(doc.output("bloburl"), "_blank");


  //doc.save("boletim_ocorrencia.pdf");
        
}