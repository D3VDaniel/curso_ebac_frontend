$(document).ready(function() {
    // Expande e retrai o menu
    
    $('#tel').mask('(00) 00000-0000');

    $('.item-2 header a').click(function() {
        $('.item-2 ul').slideToggle();
    });

    // Restaurar o valor do campo de entrada do localStorage
    if (localStorage.getItem('novaTarefa')) {
        $('#nova-tarefa').val(localStorage.getItem('novaTarefa'));
    }

    // Salvar o valor do campo de entrada no localStorage sempre que ele for alterado
    $('#nova-tarefa').on('input', function() {
        localStorage.setItem('novaTarefa', $(this).val());
    });

     // Adiciona nova tarefa à lista
    $('#form-tarefas').submit(function(event) {
        event.preventDefault();
        var novaTarefa = $('#nova-tarefa').val();
        if (novaTarefa) {
            $('#lista-tarefas').append('<li><input type="checkbox"><p>' + novaTarefa + '</p></li>');
            $('#nova-tarefa').val('');
        }
    })

    // Marca tarefas como concluídas

    $('#lista-tarefas').on('click', 'li', function() {
        var checkbox = $(this).find('input');
        var tarefa = $(this).find('p');
        checkbox.prop('checked', checkbox.prop('checked'));
        tarefa.toggleClass('completed', checkbox.prop('checked'));
    });
});

// CSS para tarefa concluída

const style = document.createElement('style');
style.innerHTML = `
    .completed {
        text-decoration: line-through;
        color: grey;
    }
`;
document.head.appendChild(style);

$('#form-envio').validate({
    rules: {
        nome: {
            required: true
        },
        email: {
            required: true,
            email: true
        },
        tel: {
            required: true,
        },
    },
    submitHandler: function(form) {
        alert("Parabéns! Suas Tarefas foram enviadas por Email. Continue monitorando.");
        form.reset();
    },
    invalidHandler: function (form, validador) {
        let camposIncorretos = validador.numberOfInvalids();
        if (camposIncorretos) {
        alert(`Existe(m) ${camposIncorretos} campo(s) incorreto(s). Por favor, preencha corretamente para prosseguir com a compra!`);
        }
    }
})