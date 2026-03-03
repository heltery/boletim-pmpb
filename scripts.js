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

      <input type="text" id="nome_vitima${i}" placeholder="Nome Vitima"><br>
      <input type="date" id="dataNascimento_vitima${i}" placeholder="Data de Nascimento"><br>
      <input type="text" id="genitora_vitima${i}" placeholder="Genitora"><br>
      <input type="text" id="rg_vitima${i}" placeholder="RG"><br>
      <input type="text" id="cpf_vitima${i}" placeholder="CPF"><br>
      <input type="text" id="endereço_vitima${i}" placeholder="Endereço"><br>
      <input type="text" id="profissao_vitima${i}" placeholder="Profissão"><br>
      <input type="text" id="telefone_vitima${i}" placeholder="Telefone"><br>
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

      <input type="text" id="nome_testemunha${i}" placeholder="Nome Testemunha"><br>
      <input type="date" id="dataNascimento_testemunha${i}" placeholder="Data de Nascimento"><br>
      <input type="text" id="genitora_testemunha${i}" placeholder="Genitora"><br>
      <input type="text" id="rg_testemunha${i}" placeholder="RG"><br>
      <input type="text" id="cpf_testemunha${i}" placeholder="CPF"><br>
      <input type="text" id="endereço_testemunha${i}" placeholder="Endereço"><br>
      <input type="text" id="profissao_testemunha${i}" placeholder="Profissão"><br>
      <input type="text" id="telefone_testemunha${i}" placeholder="Telefone"><br>
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


/* NOVA FUNÇÂO PARA DEIXAR TUDO EM CAIXA ALTA NO PDF */
function v(id) {
  const el = document.getElementById(id);
  return el ? (el.value ?? "").trim() : "";
}

function V(id) { // caixa alta
  return v(id).toUpperCase();
}

function textoUpper(texto) {
  return (texto ?? "").toString().trim().toUpperCase();
}
/*-------------------------------------------------------*/





//
// AQUI PRA BAIXO É A ALMA DE TUDO, FUNÇÃO DE GERAR PDF 
// FUI CORRIGINDO COM PASSAR DOS DIAS PEGANDO FEEDBACK DO PESSOAL QUE ESTAVA USANDO
//
//
//




// FUNÇÃO PARA GERAR O ARQUIVO PDF ----------------------------------------------------------------------
function gerarPDF() {
  const { jsPDF } = window.jspdf;
  const doc = new jsPDF("p", "mm", "a4");

  // HELPERS
  const N = (id) => {
    const el = document.getElementById(id);
    return el ? (el.value ?? "").toString().trim() : "";
  };
  const U = (id) => N(id).toUpperCase();

  // FORMATAR DATAS
  function formatarDataBR(dataISO) {
  if (!dataISO) return "";
  
  const partes = dataISO.split("-");
  if (partes.length !== 3) return dataISO;

  const [ano, mes, dia] = partes;
  return `${dia}/${mes}/${ano}`;
  }

  // PÁGINA / MARGENS
  const pageWidth = doc.internal.pageSize.getWidth();
  const pageHeight = doc.internal.pageSize.getHeight();
  const marginBottom = 15;
  const margem = 15;

  // LINHAS MAIS FINAS
  doc.setLineWidth(0.2);

  let y = 25;

  function verificarQuebraPagina(espaco = 10) {
    if (y + espaco >= pageHeight - marginBottom) {
      doc.addPage();
      doc.setLineWidth(0.2);
      y = 25;
    }
  }

  // ===================== MOTOR UNIVERSAL DE LINHAS (ANTI-SOBREPOSIÇÃO) =====================
  // (mais "justo" / compacto)
  const alturaLinha = 4.2;      // era 5 (mais compacto)
  const gapLabelValor = 3.8;    // era 5
  const gapAposLinha = 3.2;     // era 5

  function wrap(texto, largura) {
    texto = (texto ?? "").toString();
    if (!texto.trim()) return [""];
    return doc.splitTextToSize(texto, Math.max(10, largura));
  }

  function escreverWrap(texto, x, yAtual, largura) {
    const linhas = wrap(texto, largura);
    doc.text(linhas, x, yAtual);
    return linhas.length * alturaLinha;
  }

  function linhaColunas(cols, espacoMinimo = 20) {
    verificarQuebraPagina(espacoMinimo);

    // labels
    doc.setFont("Times", "normal");
    cols.forEach(c => {
      if (c.label) doc.text(c.label, c.x, y);
    });

    // valores (podem quebrar)
    const yValor = y + gapLabelValor;
    const alturas = cols.map(c => escreverWrap(c.value, c.x, yValor, c.w));
    const hMax = Math.max(...alturas, alturaLinha);

    // avança y
    y = yValor + hMax;

    // separador
    y += 1.6;
    doc.line(margem, y, pageWidth - margem, y);
    y += gapAposLinha;
  }

  function linha1col(label, value, x, w) {
    linhaColunas([{ label, value, x, w }], 18);
  }

  function linha2col(l1, v1, x1, w1, l2, v2, x2, w2) {
    linhaColunas(
      [
        { label: l1, value: v1, x: x1, w: w1 },
        { label: l2, value: v2, x: x2, w: w2 },
      ],
      19
    );
  }

  function linha3col(l1, v1, x1, w1, l2, v2, x2, w2, l3, v3, x3, w3) {
    linhaColunas(
      [
        { label: l1, value: v1, x: x1, w: w1 },
        { label: l2, value: v2, x: x2, w: w2 },
        { label: l3, value: v3, x: x3, w: w3 },
      ],
      21
    );
  }

  function linha4col(l1, v1, x1, w1, l2, v2, x2, w2, l3, v3, x3, w3, l4, v4, x4, w4) {
    linhaColunas(
      [
        { label: l1, value: v1, x: x1, w: w1 },
        { label: l2, value: v2, x: x2, w: w2 },
        { label: l3, value: v3, x: x3, w: w3 },
        { label: l4, value: v4, x: x4, w: w4 },
      ],
      22
    );
  }
  // =========================================================================================

  function tituloSecao(texto) {
  // altura da faixa
  const h = 8;

  verificarQuebraPagina(h + 6);

  // fundo cinza (faixa)
  doc.setFillColor(220, 220, 220); // cinza claro
  doc.rect(margem, y, pageWidth - margem * 2, h, "F");

  // texto do título
  doc.setFont("Times", "bold");
  doc.setTextColor(0, 0, 0);
  doc.text(texto.toUpperCase(), pageWidth / 2, y + 5.6, { align: "center" });

  // volta padrão
  doc.setFont("Times", "normal");
  doc.setTextColor(0, 0, 0);

  // avança y
  y += h + 5;
}

  // BLOCO DE TEXTO EM CAIXA (compacto)
  function blocoTexto(titulo, texto) {
    if (!texto || texto.toString().trim() === "") texto = "Nada consta.";
    texto = texto.toString().toUpperCase();

    const larguraCaixa = pageWidth - margem * 2;

    const linhas = doc.splitTextToSize(texto, larguraCaixa - 4);
    const alturaTexto = linhas.length * alturaLinha;
    const alturaTotal = alturaTexto + 7; // padding mais justo

    verificarQuebraPagina(alturaTotal + 16);

    doc.setFont("Times", "bold");
    if (titulo && titulo.trim()) {
      doc.text(titulo, pageWidth / 2, y, { align: "center" });
      y += 1.6;
      doc.line(margem, y, pageWidth - margem, y);
      y += 3.2;
    }

    doc.setFont("Times", "normal");
    doc.rect(margem, y, larguraCaixa, alturaTotal);
    doc.text(linhas, margem + 2, y + 5.2);

    y += alturaTotal + 4.2;
  }

  // ===================== CABEÇALHO =====================
  let imgLeft = document.getElementById("logoEsquerda");
  let imgRight = document.getElementById("logoDireita");

  doc.addImage(imgLeft, "PNG", margem, 5, 30, 18);
  doc.addImage(imgRight, "PNG", pageWidth - 30, 5, 20, 20);

  doc.setFont("Times", "bold");
  doc.setFontSize(12);

  let cab1 = "ESTADO DA PARAÍBA - POLÍCIA MILITAR";
  doc.text(cab1, (pageWidth - doc.getTextWidth(cab1)) / 2, 10);

  let cab2 = "BOLETIM DE OCORRÊNCIA";
  doc.text(cab2, (pageWidth - doc.getTextWidth(cab2)) / 2, 20);

  doc.setFont("Times", "normal");
  doc.setFontSize(10);

  // ===================== DADOS DA OCORRÊNCIA =====================
  const uop = U("uop");
  const numeroCICC = U("numeroCICC");
  const data = formatarDataBR(N("data"));
  const hora = N("hora");
  const endereco = U("endereco");
  const numeroEndereco = U("numeroEndereco");
  const pontoReferencia = U("pontoReferencia");
  const natureza = U("natureza");
  const codigo = U("codigo");

  // separador inicial
  doc.line(margem, y, pageWidth - margem, y);
  y += 4.2;

  // ✅ PRIMEIRA LINHA EM 4 COLUNAS (COM Nº CICC)
  // A4: 210mm. Com margem 15, direita útil ~195.
  // Colunas: 15..54 / 55..109 / 110..149 / 150..195
  linha4col(
    "UOp/SUOp:", uop, 15, 39,
    "Data da Ocorrência:", data, 55, 54,
    "Hora:", hora, 110, 39,
    "Nº ficha CICC:", numeroCICC, 150, (pageWidth - margem - 150)
  );

  // Endereço + Nº
  linha2col(
    "Endereço:", endereco, 15, 145,
    "Nº:", numeroEndereco, 170, pageWidth - 170 - margem
  );

  // Ponto de Referência
  linha1col("Ponto de Referência:", pontoReferencia, 15, pageWidth - 30);

  // Natureza + Código
  linha2col(
    "Natureza da Ocorrência:", natureza, 15, 140,
    "Código:", codigo, 165, pageWidth - 165 - margem
  );

  // ===================== SOLICITANTE =====================
  tituloSecao("DADOS DO(A) SOLICITANTE");

  const solicitante = U("solicitante");
  const telefone = U("telefone");
  const enderecoSolic = U("enderecoSolic");

  linha2col(
    "Solicitante:", solicitante, 15, 140,
    "Telefone:", telefone, 160, pageWidth - 160 - margem
  );
  linha1col("Endereço solicitante:", enderecoSolic, 15, pageWidth - 30);

  // ===================== GUARNIÇÕES =====================
  tituloSecao("DADOS DA(S) GUARNIÇÃO(ÕES)");

  const qtdGU = parseInt(N("qtdGU") || "0", 10);

  for (let i = 1; i <= qtdGU; i++) {
    verificarQuebraPagina(35);

    doc.setFont("Times", "bold");
    const t = "GUARNIÇÃO " + i;
    doc.text(t, (pageWidth - doc.getTextWidth(t)) / 2, y);
    y += 1.8;
    doc.line(margem, y, pageWidth - margem, y);
    y += 3.6;
    doc.setFont("Times", "normal");

    const guarnicao = U("guarnicao" + i);
    const vtr = U("vtr" + i);
    const cmd = U("cmd" + i);
    const mot = U("mot" + i);
    const pat1 = U("pat1" + i);
    const pat2 = U("pat2" + i);

    linha3col(
      "Guarnição:", guarnicao, 15, 75,
      "Viatura:", vtr, 100, 50,
      "Comandante:", cmd, 160, pageWidth - 160 - margem
    );

    linha3col(
      "Motorista:", mot, 15, 75,
      "Patrulheiro 01:", pat1, 95, 55,
      "Patrulheiro 02:", pat2, 160, pageWidth - 160 - margem
    );
  }

  // ===================== ACUSADOS =====================
  tituloSecao("DADOS DO(A) ACUSADO(S)");

  const qtdAcusado = parseInt(N("qtdACUSADO") || "0", 10);

  for (let i = 1; i <= qtdAcusado; i++) {
    verificarQuebraPagina(70);

    doc.setFont("Times", "bold");
    const t = "ENVOLVIDO/SUSPEITO " + i;
    doc.text(t, (pageWidth - doc.getTextWidth(t)) / 2, y);
    y += 1.8;
    doc.line(margem, y, pageWidth - margem, y);
    y += 3.6;
    doc.setFont("Times", "normal");

    const acusado = U("nome_acusado" + i);
    const nascAcusado = formatarDataBR(N("DataNascimento" + i));
    const genitora = U("Genitora" + i);
    const rg = U("RG" + i);
    const cpf = U("CPF" + i);
    const enderecoAcus = U("Endereço" + i);
    const profissao = U("Profissao" + i);
    const cnh = U("CNH" + i);
    const pele = U("CorPele" + i);
    const fisico = U("compleicaoFisica" + i);
    const cabelo = U("corCabelo" + i);
    const olhos = U("corOlhos" + i);
    const altura = U("altura" + i);
    const marcas = U("MarcasCaracteristicas" + i);

    linha3col(
      "Nome:", acusado, 15, 75,
      "Data de Nascimento:", nascAcusado, 95, 55,
      "CPF:", cpf, 155, pageWidth - 155 - margem
    );

    linha3col(
      "Genitora:", genitora, 15, 75,
      "RG:", rg, 95, 55,
      "CNH:", cnh, 155, pageWidth - 155 - margem
    );

    linha2col(
      "Endereço:", enderecoAcus, 15, 130,
      "Profissão:", profissao, 155, pageWidth - 155 - margem
    );

    linha3col(
      "Cor da Pele:", pele, 15, 75,
      "Cor dos Olhos:", olhos, 95, 55,
      "Cor do Cabelo:", cabelo, 155, pageWidth - 155 - margem
    );

    linha3col(
      "Compleição Física:", fisico, 15, 75,
      "Altura:", altura, 95, 55,
      "Marcas Características:", marcas, 155, pageWidth - 155 - margem
    );
  }

  // ===================== VÍTIMAS =====================
  tituloSecao("DADOS DA(S) VITIMA(S)");

  const qtdVitima = parseInt(N("qtdVitima") || "0", 10);

  for (let i = 1; i <= qtdVitima; i++) {
    verificarQuebraPagina(60);

    doc.setFont("Times", "bold");
    const t = "VITIMA " + i;
    doc.text(t, (pageWidth - doc.getTextWidth(t)) / 2, y);
    y += 1.8;
    doc.line(margem, y, pageWidth - margem, y);
    y += 3.6;
    doc.setFont("Times", "normal");

    const vitima = U("nome_vitima" + i);
    const nascimento = formatarDataBR(N("dataNascimento_vitima" + i));
    const genitora = U("genitora_vitima" + i);
    const rg = U("rg_vitima" + i);
    const cpf = U("cpf_vitima" + i);
    const enderecoVit = U("endereço_vitima" + i);
    const telefoneVit = U("telefone_vitima" + i);
    const profissaoVit = U("profissao_vitima" + i);

    linha3col(
      "Nome:", vitima, 15, 75,
      "Data de Nascimento:", nascimento, 95, 55,
      "CPF:", cpf, 155, pageWidth - 155 - margem
    );

    linha3col(
      "Genitora:", genitora, 15, 75,
      "RG:", rg, 95, 55,
      "Telefone:", telefoneVit, 155, pageWidth - 155 - margem
    );

    linha2col(
      "Endereço:", enderecoVit, 15, 130,
      "Profissão:", profissaoVit, 155, pageWidth - 155 - margem
    );
  }

  // ===================== TESTEMUNHAS =====================
  tituloSecao("DADOS DA(S) TESTEMUNHA(S)");

  const qtdTestemunha = parseInt(N("qtdTestemunha") || "0", 10);

  for (let i = 1; i <= qtdTestemunha; i++) {
    verificarQuebraPagina(60);

    doc.setFont("Times", "bold");
    const t = "TESTEMUNHA " + i;
    doc.text(t, (pageWidth - doc.getTextWidth(t)) / 2, y);
    y += 1.8;
    doc.line(margem, y, pageWidth - margem, y);
    y += 3.6;
    doc.setFont("Times", "normal");

    const testemunha = U("nome_testemunha" + i);
    const nascimento = formatarDataBR(N("dataNascimento_vitima" + i));
    const genitora = U("genitora_testemunha" + i);
    const rg = U("rg_testemunha" + i);
    const cpf = U("cpf_testemunha" + i);
    const enderecoTest = U("endereço_testemunha" + i);
    const telefoneTest = U("telefone_testemunha" + i);
    const profissaoTest = U("profissao_testemunha" + i);

    linha3col(
      "Nome:", testemunha, 15, 75,
      "Data de Nascimento:", nascimento, 95, 55,
      "CPF:", cpf, 155, pageWidth - 155 - margem
    );

    linha3col(
      "Genitora:", genitora, 15, 75,
      "RG:", rg, 95, 55,
      "Telefone:", telefoneTest, 155, pageWidth - 155 - margem
    );

    linha2col(
      "Endereço:", enderecoTest, 15, 130,
      "Profissão:", profissaoTest, 155, pageWidth - 155 - margem
    );
  }

  // ===================== MATERIAIS =====================
  tituloSecao("MATERIAIS APREENDIDOS");
  blocoTexto("ARMAS DE FOGO E MUNIÇÕES", N("arma"));
  blocoTexto("DROGAS", N("droga"));
  blocoTexto("OUTROS MATERIAIS", N("outros"));

  // ===================== RELATO =====================
  tituloSecao("RELATO DA OCORRENCIA");
  blocoTexto("", N("relato"));

  // ===================== AUTO DE RESISTÊNCIA =====================
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

  const usoForca = document.querySelector('input[name="usoForca"]:checked')?.value || "nao";
  if (usoForca === "sim") {
    let nomesAcusados = obterNomesAcusados();
    if (nomesAcusados.length === 0) nomesAcusados.push("");
    tituloSecao("AUTO DE RESISTÊNCIA");
    blocoTexto("", textoAutoResistencia(nomesAcusados));
  }

  // ===================== ASSINATURAS =====================
  function secaoAssinaturas() {
    verificarQuebraPagina(120);

    const largura = pageWidth - margem * 2;

    doc.setFont("Times", "bold");
    doc.text("ASSINATURAS", pageWidth / 2, y, { align: "center" });
    y += 2;
    doc.line(margem, y, pageWidth - margem, y);
    y += 9;

    doc.setFont("Times", "normal");

    doc.text("Condutor:", margem, y);
    doc.line(margem + 22, y + 1, pageWidth - margem - 40, y + 1);
    doc.text("Data:", pageWidth - margem - 35, y);
    doc.line(pageWidth - margem - 25, y + 1, pageWidth - margem, y + 1);
    y += 11;

    doc.text("Testemunha 01:", margem, y);
    doc.line(margem + 35, y + 1, pageWidth - margem - 40, y + 1);
    doc.text("Data:", pageWidth - margem - 35, y);
    doc.line(pageWidth - margem - 25, y + 1, pageWidth - margem, y + 1);
    y += 11;

    doc.text("Testemunha 02:", margem, y);
    doc.line(margem + 35, y + 1, pageWidth - margem - 40, y + 1);
    doc.text("Data:", pageWidth - margem - 35, y);
    doc.line(pageWidth - margem - 25, y + 1, pageWidth - margem, y + 1);
    y += 16;

    doc.setFont("Times", "bold");
    doc.text("RECEBIMENTO – POLÍCIA CIVIL", pageWidth / 2, y, { align: "center" });
    y += 2;
    doc.line(margem, y, pageWidth - margem, y);
    y += 5.5;

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

    y += alturaCaixa + 8;
  }
  secaoAssinaturas();

  window.open(doc.output("bloburl"), "_blank");
}

