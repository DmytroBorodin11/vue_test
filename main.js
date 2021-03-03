
const Counter = {
    data () {
        return {
            title: 'Notes',
            placeholder: 'Wright your note',
            inputValue: '',
            notes: [],
            todoListTitle: 'Daily tasks and main purpose',
            todoList: [
                {
                    id: 1,
                    todo: 'learn Vue'
                },
                {
                    id: 2,
                    todo: 'learn Pro JS'
                },
                {
                    id: 3,
                    todo: 'become a middle js developer'
                },
            ],
            usersBlock: {
                title: 'Friends request',
                users: [
                    {
                        id: 1,
                        userName: 'John Doe',
                        userPosition: 'CTO',
                        userImg: './imgs/friend_1.jpg',
                    },
                    {
                        id: 2,
                        userName: 'Kate Svarovski',
                        userPosition: 'Project Manager',
                        userImg: './imgs/friend_2.jpg',
                    },
                    {
                        id: 3,
                        userName: 'Bni Cist',
                        userPosition: 'Team Lead',
                        userImg: './imgs/friend_3.jpg',
                    },
                    {
                        id: 4,
                        userName: 'Ann Fedorenko',
                        userPosition: 'Designer',
                        userImg: './imgs/friend_4.jpg',
                    },
                ]
            },
            friendsBlock: {
                title: 'Friends list',
                friends: []
            },
        }
    },
    methods: {
        addNote () {
            if (this.inputValue !== '') {
                this.notes.push(this.inputValue);
                this.inputValue = '';
            }
        },
        deleteNote(idx) {
            this.notes.splice(idx, 1);
        },
        doubleLength() {
            console.log('doubleLength');
            return this.notes.length*2;
        },
        addFriend(id, idx) {
            let newFriend = {
                ...this.usersBlock.users.find(user => user.id === id)
            };
            this.friendsBlock.friends.find(friend => friend.id === id) ? '' :
            this.friendsBlock.friends.push(newFriend);
            this.usersBlock.users.splice(idx, 1);
        },
        removeRequest(id, arrName) {
            switch(arrName) {
                case 'users':
                    this.usersBlock.users.splice(id, 1);
                    return
                case 'friends': 
                    this.friendsBlock.friends.splice(id, 1);
                    return
                default: return;
            }
            
        },
    },
    computed: {
        doubleLengthComputed () {
            console.log('doubleLengthComputed')
            return this.notes.length*2;
        }
    }
}

const app = Vue.createApp(Counter);

const todoItem = app.component('todo-item', {
    props: ['listitem'],
    template: `<li> {{ listitem.todo }} </li>`
})

const userCard = app.component('user-card', {
    props: ['item', 'c-disabled', 'd-disabled', 'arr-name',
            'fu-disabled', 'add-friend', 'remove-request', 'id' ],
    template: `<div class='user__card'>
                    <div class='user__block'>
                        <div class='user__img'>
                            <img :src='item.userImg'/>
                        </div>
                        <div class='user__info'>
                            <p class='user__name'>{{ item.userName }}</p>
                            <p class='user__position'>{{ item.userPosition }}</p>
                        </div>
                    </div>
                    <div class='btns__block'>
                        <custom-btn title='Confirm' @click='addFriend(item.id, id)'
                        :class="[cDisabled ? 'disabled' : '', 'confirm']"></custom-btn>
                        <custom-btn title='Delete' @click='removeRequest(id, arrName)'
                        :class="[dDisabled ? 'disabled' : '', 'delete']"></custom-btn>
                        <custom-btn title='Unfollow' @click='removeRequest(id, arrName)'
                        :class="[fuDisabled ? 'disabled' : '', 'fu']"></custom-btn>
                    </div>
               </div>`
})

const customBtn = app.component('custom-btn', {
    props: ['title'],
    template: `<button class='custom__btn'>
                    {{ title }}
               </button>`
});

app.mount('#counter');




