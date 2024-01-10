/// <reference types="cypress" />


describe('tarefas', () => {

    context('cadastro', () => {
        it('deve cadastrar uma nova tarefa', () => {

            const taskName = 'Ler um livro de Node.js'
    
            cy.removeTaskByName(taskName)
            cy.createTask(taskName)
    
            cy.contains('main div p', taskName)
                .should('be.visible')
        })
    
        it('não deve permitir tarefa duplicada', () => {
    
            const task = {
                name:'Estudar Javascript',
                is_done: false
            }
    
            //Dado que eu tenho uma tarefa duplicada
            cy.removeTaskByName(task.name)
            cy.postTask(task)
            
            //Quando faço o cadastro dessa tarefa
            cy.createTask(task.name)
    
            //Então vejo a mensagem de duplicidade
            cy.get('.swal2-html-container')
                .should('be.visible')
                .should('have.text', 'Task already exists!')
    
        })
    
        it('campo obrigatório', () => {
            cy.createTask()
    
            cy.isRequired('This is a required field')
        })
    })
    
})


