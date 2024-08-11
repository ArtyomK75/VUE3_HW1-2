<template>
    <div class="container" id="pageCounter">
        <div class="row">
            <div class="col-6">
                <h1 class="text-left">{{counter}}</h1>
                </div>
            </div>
            <div class="row">
                <div class="col-10">
                    <button class="btn btn-danger" @click="increment">Plus</button>
                    <button class="btn btn-success" @click="decrement">Minus</button>
                </div>
            </div>
        </div>
    <div>
        <input type="text" :value=someInput @input="onChangeInput">
        <h1 class="text-left">{{someInput + checkInput}}</h1>
        <br>
        <h1 class="text-left">{{counterResul}}</h1>
    </div>
    <secondComponent/>

    <child-component :childCounter="counter"></child-component>
    <div>
        <h3>Filtered Items by vendor</h3>
        <input type="text"  v-model="searchQuery" placeholder="Search by vendor">
        <ul>
            <li v-for="item in filteredItems" :key="item.id">{{ item.name }}</li>
        </ul>
    </div>    
    <div>        
        <h3>Combined Data</h3>
        <ul>
            <li v-for="item in combinedData" :key="item.id">{{ item.name }}</li>
        </ul>
    </div>    
    <div>    
        <h3>Filtered and Sorted Items</h3>
        <ul>
            <li v-for="item in filteredAndSortedItems" :key="item.id">{{ item.name }}</li>
        </ul>
    </div>

    <button class="btn btn-danger" @click="incrementAge">Plus</button>
    <h1 class="text-left">Age of {{human.name + ' ' + human.surname + ' is '+ human.age}}</h1>
</template>

<script>
    import secondComponent from './secondComponent.vue';
    export default {
        components: {
            secondComponent,
        },
        data () {
            return {
                someInput:  "Some text",
                checkInput: "",
                counter: 0,
                counterDescription: "Positive clicks on page (computed): ",
                items: [
                    { id: 1, name: 'Apple 15', vendor: 'Apple' },
                    { id: 2, name: 'Samsung S24', vendor: 'Samsung' },
                    { id: 3, name: 'Xiaomi 13', vendor: 'Xiaomi' },
                    { id: 4, name: 'Apple 14', vendor: 'Apple' },
                    { id: 5, name: 'Samsung S23', vendor: 'Samsung' },
                    { id: 6, name: 'Xiaomi 12', vendor: 'Xiaomi' },
                ],
                searchQuery: "",
                human: {name: "John", surname: "Smith", age: 25},
            }
        },
        methods: {
            increment() {
                this.counter++;
            },
            decrement() {
                if (this.counter > 0) {
                    this.counter--;
                }
            },
            onChangeInput(event) {
                this.someInput = event.target.value;
                if (/[._\/\\|,]/.test(this.someInput)) {
                    this.checkInput = ' The entered text contains one of the prohibited characters';
                } else {
                    this.checkInput = '';
                }

            },
            incrementAge() {
                this.human.age++;
            },

        },
        computed: {
            counterResul() {
                return this.counterDescription + this.counter;
            },
            filteredItems () {
                return this.items.filter(item => item.vendor.toLowerCase().includes(this.searchQuery.toLowerCase()));
            },
            combinedData() {
                const combinedDataArray = [...this.items, ...externalData.value];
                console.log(externalData);
                return combinedDataArray;
            },
            sortedItems () {
                return this.combinedData.sort((a, b) => a.name.localeCompare(b.name));
            },
            filteredAndSortedItems () {
                return this.sortedItems.filter(item => item.vendor === undefined ? item : 
                    item.vendor.toLowerCase().includes(this.searchQuery.toLowerCase()));
            },            
        },
        watch: {
            counter(newValue, oldValue) {
                console.log('New value: ' + newValue, 'Old value: ' + oldValue);
            },
            async someInput(newValue, oldValue) {
                console.log('Input "Some input" is changed:', newValue);
                await fetchData();
            },
            filteredItems (newValue, oldValue) {
                console.log('Filtered items changed:', newValue);
            },
            human: {
                handler(newValue, oldValue) {
                    console.log('Change age of human:', newValue);
                },
                deep: true,
            },
            items: {
                handler(newValue, oldValue) {
                    console.log(oldValue, newValue);
                },
                immediate: true,
                
            } 
        }

    }
    const externalData = Vue.ref([]);
    async function fetchData () {
                const response = await fetch('http://universities.hipolabs.com/search?country=Ukraine');
                externalData.value = await response.json();
            };
    fetchData();
    
</script>

<style>


</style>