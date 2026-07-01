export const REGIOES = ["Centro","Norte","Sul","Leste","Oeste","Zona Sul","Zona Norte"];

export const BUEIROS_INIT = [
  {id:1,codigo:"000001",end:"Av. Paulista, 1000",bairro:"Bela Vista",regiao:"Centro",lat:-23.5633,lng:-46.6544,prof:120,nivel:91,status:"cheio",limpeza:"2025-03-10",manut:"2025-01-18",inst:"2023-06-10",wid:1},
  {id:2,codigo:"000002",end:"Rua Augusta, 500",bairro:"Consolação",regiao:"Centro",lat:-23.5521,lng:-46.6582,prof:100,nivel:47,status:"metade",limpeza:"2025-04-01",manut:"2025-02-10",inst:"2023-07-22",wid:2},
  {id:3,codigo:"000003",end:"Av. Ipiranga, 200",bairro:"República",regiao:"Centro",lat:-23.5441,lng:-46.6388,prof:110,nivel:12,status:"vazio",limpeza:"2025-04-10",manut:"2025-03-05",inst:"2023-08-14",wid:3},
  {id:4,codigo:"000004",end:"Av. Rebouças, 1200",bairro:"Pinheiros",regiao:"Oeste",lat:-23.5652,lng:-46.6801,prof:130,nivel:76,status:"cheio",limpeza:"2025-03-18",manut:"2025-02-12",inst:"2023-05-30",wid:1},
  {id:5,codigo:"000005",end:"Rua da Consolação, 300",bairro:"Consolação",regiao:"Centro",lat:-23.5489,lng:-46.6571,prof:95,nivel:53,status:"metade",limpeza:"2025-03-28",manut:"2025-01-30",inst:"2023-09-18",wid:2},
  {id:6,codigo:"000006",end:"Av. Faria Lima, 3000",bairro:"Itaim Bibi",regiao:"Oeste",lat:-23.5858,lng:-46.6858,prof:140,nivel:24,status:"vazio",limpeza:"2025-04-05",manut:"2025-03-10",inst:"2022-11-25",wid:3},
  {id:7,codigo:"000007",end:"Av. Marginal Tietê, 500",bairro:"Santana",regiao:"Norte",lat:-23.5185,lng:-46.6318,prof:160,nivel:96,status:"cheio",limpeza:"2025-02-14",manut:"2024-12-08",inst:"2022-08-01",wid:4},
  {id:8,codigo:"000008",end:"Rua Vergueiro, 1800",bairro:"Vila Mariana",regiao:"Sul",lat:-23.5897,lng:-46.6355,prof:105,nivel:38,status:"metade",limpeza:"2025-04-02",manut:"2025-02-20",inst:"2023-03-14",wid:5},
  {id:9,codigo:"000009",end:"Av. Jabaquara, 900",bairro:"Jabaquara",regiao:"Sul",lat:-23.6240,lng:-46.6456,prof:115,nivel:7,status:"vazio",limpeza:"2025-04-08",manut:"2025-03-18",inst:"2023-10-05",wid:5},
  {id:10,codigo:"000010",end:"Av. Aricanduva, 2000",bairro:"Aricanduva",regiao:"Leste",lat:-23.5452,lng:-46.5215,prof:125,nivel:65,status:"metade",limpeza:"2025-03-25",manut:"2025-02-05",inst:"2023-01-20",wid:4},
  {id:11,codigo:"000011",end:"Rua Catumbi, 400",bairro:"Catumbi",regiao:"Leste",lat:-23.5350,lng:-46.5588,prof:98,nivel:82,status:"cheio",limpeza:"2025-03-01",manut:"2025-01-05",inst:"2022-12-10",wid:4},
  {id:12,codigo:"000012",end:"Av. Casa Verde, 1100",bairro:"Casa Verde",regiao:"Norte",lat:-23.5072,lng:-46.6601,prof:112,nivel:19,status:"vazio",limpeza:"2025-04-07",manut:"2025-03-22",inst:"2023-04-17",wid:6},
];

export const TRAB_INIT = [
  {id:1,codigo:"F48291",nome:"Carlos Eduardo Silva",cpf:"123.456.789-00",tel:"(11) 98765-4321",end:"Rua das Flores, 123",bairro:"Vila Madalena",regiao:"Oeste",lat:-23.5531,lng:-46.6870,status:"online",disp:true,turno:"Manhã"},
  {id:2,codigo:"ECO184",nome:"Ana Paula Ferreira",cpf:"987.654.321-00",tel:"(11) 91234-5678",end:"Av. São João, 456",bairro:"Consolação",regiao:"Centro",lat:-23.5480,lng:-46.6530,status:"online",disp:true,turno:"Tarde"},
  {id:3,codigo:"T92831",nome:"Roberto Nascimento",cpf:"456.789.123-00",tel:"(11) 94567-8901",end:"Rua Verdi, 789",bairro:"Itaim Bibi",regiao:"Oeste",lat:-23.5780,lng:-46.6820,status:"offline",disp:false,turno:"Manhã"},
  {id:4,codigo:"M10294",nome:"Fernanda Lima Costa",cpf:"321.654.987-00",tel:"(11) 97890-1234",end:"Av. Celso Garcia, 1000",bairro:"Tatuapé",regiao:"Leste",lat:-23.5380,lng:-46.5480,status:"online",disp:true,turno:"Noite"},
  {id:5,codigo:"F88210",nome:"Marcos Oliveira Santos",cpf:"654.321.098-00",tel:"(11) 92345-6789",end:"Rua do Cursino, 200",bairro:"Ipiranga",regiao:"Sul",lat:-23.6050,lng:-46.6180,status:"online",disp:false,turno:"Tarde"},
  {id:6,codigo:"ECO092",nome:"Juliana Rocha Alves",cpf:"789.012.345-00",tel:"(11) 93456-7890",end:"Av. Caetano Álvares, 800",bairro:"Limão",regiao:"Norte",lat:-23.5120,lng:-46.6580,status:"online",disp:true,turno:"Manhã"},
];

export const ALERTAS_INIT = [
  {id:1,buid:1,wid:1,urg:"crit",status:"ativo",ts:new Date(Date.now()-45*60000).toISOString(),msg:"Bueiro #000001 CHEIO — Av. Paulista, 1000"},
  {id:2,buid:4,wid:1,urg:"crit",status:"ativo",ts:new Date(Date.now()-120*60000).toISOString(),msg:"Bueiro #000004 CHEIO — Av. Rebouças, 1200"},
  {id:3,buid:7,wid:4,urg:"crit",status:"ativo",ts:new Date(Date.now()-198*60000).toISOString(),msg:"Bueiro #000007 CHEIO — Av. Marginal Tietê"},
  {id:4,buid:2,wid:2,urg:"warn",status:"ativo",ts:new Date(Date.now()-32*60000).toISOString(),msg:"Bueiro #000002 METADE — Rua Augusta, 500"},
  {id:5,buid:5,wid:2,urg:"warn",status:"concluido",ts:new Date(Date.now()-500*60000).toISOString(),fim:new Date(Date.now()-430*60000).toISOString(),msg:"Bueiro #000005 METADE — Rua da Consolação"},
  {id:6,buid:11,wid:4,urg:"crit",status:"ativo",ts:new Date(Date.now()-80*60000).toISOString(),msg:"Bueiro #000011 CHEIO — Rua Catumbi, 400"},
];
