<template>
    <ion-page>
      <ion-header :translucent="true">
        <ion-toolbar>
          <ion-title>TopUp</ion-title>
          <ion-title>User: {{ currentUserEmail }}</ion-title>
            <ion-button
                type="button"
                fill="clear"
                @click="router.push('/history')">
                Purchase History
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
        <ion-item v-if="success==1"> Purchase Succesful! </ion-item>
        <div v-if="selected==0">
            <div v-for="gamename in gameList">
                <ion-item>
                    {{ gamename.GameName }}
                </ion-item>
                <div v-for="gamebundle in bundleList">
                    <div v-if="gamebundle.GameName.GameName == gamename.GameName">
                        <ion-list>
                            <ion-button
                            type="button"
                            fill="clear"
                            @click="selected=1;success=0;selectedBundleID=gamebundle.id; selectedBundleName=gamebundle.BundleName; selectedBundleGameName=gamebundle.GameName.id; selectedBundlePrice=gamebundle.Price; selectedBundleValue=gamebundle.Value">
                            {{ gamebundle.GameName.GameName }} - {{ gamebundle.BundleName }} - Rp {{ gamebundle.Price }}
                            </ion-button>
                        </ion-list>
                    </div>
                </div>
            </div>
        </div>
  
        <div v-if="selected==1">
          <form @submit.prevent="handleTransactions">
            <ion-item> You're about to purchase: {{ selectedBundleName }} which includes {{ selectedBundleValue }} In-Game Currency for Rp {{ selectedBundlePrice }} </ion-item>
            <ion-input
            v-if="completeIGN==0"
            v-model="InGameID"
            label="In Game ID:"
            label-placement="stacked"
            placeholder="Enter your ingame id"
            type="text"
            required>
            </ion-input>
            <ion-button v-if="completeIGN==0" type="button" fill="clear" @click="completeIGN=1">Next</ion-button>
            <ion-button v-if="completeIGN==0" type="button" fill="clear" @click="selected=0">Back</ion-button>
            <ion-item v-if="completeIGN==1">
                Select Payment Methods:
                <ion-button type="button" fill="clear" @click="paymentMethod='GoPay';selectedPaymentMethod=1;completePayMethod=1">GoPay</ion-button>
                <ion-button type="button" fill="clear" @click="paymentMethod='OVO';selectedPaymentMethod=2;completePayMethod=1">OVO</ion-button>
                <ion-button type="button" fill="clear" @click="paymentMethod='Dana';selectedPaymentMethod=3;completePayMethod=1">Dana</ion-button>
            </ion-item>
                <ion-input v-if="selectedPaymentMethod==1"
                label="GoPay ID:"
                label-placement="stacked"
                placeholder="Enter your GoPay id"
                type="text"
                required>
                </ion-input>
                <ion-input v-if="selectedPaymentMethod==1"
                label="Password:"
                label-placement="stacked"
                placeholder="Password"
                type="password"
                required>
                </ion-input>
                <ion-input v-if="selectedPaymentMethod==2"
                label="OVO ID:"
                label-placement="stacked"
                placeholder="Enter your OVO id"
                type="text"
                required>
                </ion-input>
                <ion-input v-if="selectedPaymentMethod==2"
                label="Password:"
                label-placement="stacked"
                placeholder="Password"
                type="password"
                required>
                </ion-input>
                <ion-input v-if="selectedPaymentMethod==3"
                label="Dana ID:"
                label-placement="stacked"
                placeholder="Enter your Dana id"
                type="text"
                required>
                </ion-input>
                <ion-input v-if="selectedPaymentMethod==3"
                label="Password:"
                label-placement="stacked"
                placeholder="Password"
                type="password"
                required>
                </ion-input>
            <ion-button v-if="completePayMethod==1" type="submit" fill="clear">Send</ion-button>
            <ion-button v-if="completeIGN==1" type="button" fill="clear" @click="selectedPaymentMethod=0;completePayMethod=0;completeIGN=0">Back</ion-button>
          </form>
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
  const gameList = ref();
  const bundleList = ref();
  const selectedBundleID = ref();
  const selectedBundleName = ref();
  const selectedBundleValue = ref();
  const selectedBundleGameName = ref();
  const selectedBundlePrice = ref();
  const InGameID = ref("");
  const completePayMethod = ref(0);
  const selectedPaymentMethod = ref(0);
  const completeIGN = ref(0);
  const paymentMethod = ref("");
  const success = ref(0);
  const selected = ref(0);

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
  const getGames = async () => {
    try {
    const req = await fetch('http://localhost:3000/api/Games/', {
      method: "GET", 
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
    })
    const data = await req.json()
    gameList.value = data.docs;
    console.log(data);
    console.log(gameList.value);
  } catch (err) {
    console.log(err)
    }
  }
  const getBundles = async () => {
    try {
    const req = await fetch('http://localhost:3000/api/Bundles', {
      method: "GET", 
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
    })
    const data = await req.json()
    bundleList.value = data.docs;
    console.log(data);
    console.log(bundleList.value);
  } catch (err) {
    console.log(err)
    }
  }

  const getFormattedDate = (): string => {
    const date = new Date();
    return date.toISOString();  // This returns the date in ISO 8601 format
}

  const handleTransactions = async () => {
  try {
    const resp = await fetch("http://localhost:3000/api/Transactions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        Date: getFormattedDate(),
        TotalPrice: selectedBundlePrice.value,
        GameName: selectedBundleGameName.value,
        InGameName: InGameID.value,
        BundleName: selectedBundleID.value,
        UserName: currentUserId.value,
        PaymentMethod: paymentMethod.value
      }),
    });
    if (!resp.ok) {
      const errorMsg = (await resp.json())?.errors[0].message;
      throw new Error(errorMsg);
    }
    const user = await resp.json();
    console.log(user);

  } catch (error: any) {
    alert("Error " + error.message);
    return;
  }
  success.value = 1;
  selected.value = 0;
  completePayMethod.value = 0;
  selectedPaymentMethod.value = 0;
  completeIGN.value = 0;
}
  
  getCurrentUser();
  getGames();
  getBundles();
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
  