<template>
    <ion-page>
      <ion-header :translucent="true">
        <ion-toolbar>
          <ion-title>TopUp</ion-title>
          <ion-title>User: {{ currentUserEmail }}</ion-title>
            <ion-button
                type="button"
                fill="clear"
                @click="router.push('/dashboard')">
                Back <
            </ion-button>
            <ion-button
                type="button"
                fill="clear"
                @click="logout">
                Log Out
            </ion-button>
        </ion-toolbar>
      </ion-header>
  
      <ion-content :fullscreen="true">
        <div v-if="historyList" v-for="item in historyList">
            <div v-if="currentUserId==item.UserName.id">
                <ion-list>
                    Purchase Date: {{ item.Date }} - Game: {{ item.GameName.GameName }} - Item Purchased: {{ item.BundleName.BundleName }} - IGN: {{ item.InGameName }} - Price: Rp {{ item.BundleName.Price }} - Payment Method: {{ item.PaymentMethod }}
                </ion-list>
            </div>
        </div>
        
  
      </ion-content>
    </ion-page>
  </template>
  
  <script setup lang="ts">
  import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonList, IonLabel, IonInput, IonItem, IonButton ,useIonRouter } from '@ionic/vue';
  import { ref } from 'vue';
  const router = useIonRouter();
  
  const currentUserId = ref();
  const currentUserEmail = ref();
  const historyList = ref();

  const logout = async () => {
    try {
        const req = await fetch('http://localhost:3000/api/Users/logout', {
        method: "POST", 
        credentials: "include",
        headers: {
            "Content-Type": "application/json",
        },
        })
        const data = await req.json()
        } catch (err) {
            console.log(err)
            return
        }
    router.replace('/home')
}
  const getCurrentUser = async () => {
    try {
    const req = await fetch('http://localhost:3000/api/Users/me', {
      method: "GET", 
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
    })
    const data = await req.json()
    currentUserEmail.value = data.user.email;
    currentUserId.value = data.user.id;
    console.log(data);
    console.log(currentUserEmail.value);
  } catch (err) {
    console.log(err)
    router.replace('/home')
    }
  }

  const getHistory = async () => {
    try {
    const req = await fetch('http://localhost:3000/api/Transactions', {
      method: "GET", 
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
    })
    const data = await req.json()
    historyList.value = data.docs;
    console.log(data);
  } catch (err) {
    console.log(err)
    }
  }
  
  getCurrentUser();
  getHistory();
  </script>
  
  <style scoped>
  #container {
    text-align: center;
    
    position: absolute;
    left: 0;
    right: 0;
    top: 50%;
    transform: translateY(-50%);
  }
  
  #container strong {
    font-size: 20px;
    line-height: 26px;
  }
  
  #container p {
    font-size: 16px;
    line-height: 22px;
    
    color: #8c8c8c;
    
    margin: 0;
  }
  
  #container a {
    text-decoration: none;
  }
  </style>
  