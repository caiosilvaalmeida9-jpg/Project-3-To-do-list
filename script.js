
const form = document.getElementById('form-tarefa');
const input = document.getElementById('input-tarefa');
const lista = document.getElementById('lista-tarefas');




let tarefas = JSON.parse(localStorage.getItem('tarefas')) || [];




function renderizarTarefas() {
    lista.innerHTML = ''; 

    tarefas.forEach((tarefa, index) => {
        const li = document.createElement('li');
        li.className = `item-tarefa ${tarefa.concluida ? 'concluida' : ''}`;

        
        li.innerHTML = `
            <span class="texto-tarefa" data-index="${index}" style="cursor: pointer; flex: 1;">${tarefa.texto}</span>
            <button class="btn-deletar" data-index="${index}">❌</button>
        `;

        lista.appendChild(li);
    });

    
    localStorage.setItem('tarefas', JSON.stringify(tarefas));
}




form.addEventListener('submit', function (event) {
    event.preventDefault(); 

    const textoTarefa = input.value.trim();

    if (textoTarefa !== '') {
        tarefas.push({ texto: textoTarefa, concluida: false });
        input.value = ''; 
        renderizarTarefas(); 
    }
});




lista.addEventListener('click', function (event) {
    const elementoClicado = event.target;
    const index = elementoClicado.getAttribute('data-index');

    if (index === null) return; 

  
    if (elementoClicado.classList.contains('btn-deletar')) {
        tarefas.splice(index, 1);
        renderizarTarefas();
    } 
    
    else if (elementoClicado.classList.contains('texto-tarefa')) {
        tarefas[index].concluida = !tarefas[index].concluida;
        renderizarTarefas();
    }
});




renderizarTarefas();