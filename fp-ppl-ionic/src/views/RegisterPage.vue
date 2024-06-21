<template>
    <ion-page>
      <ion-header :translucent="true">
        <ion-toolbar>
          <ion-title> TopUp </ion-title>
        </ion-toolbar>
      </ion-header>
  
      <ion-content :fullscreen="true" >
        <h3 style="margin-left:16px">Register</h3>
        <ion-list :inset="true">
          <form @submit.prevent="handleRegister">
            <ion-item>
              <ion-input
                v-model="email"
                name="email"
                label="Email"
                label-placement="stacked"
                autocomplete="email"
                type="email"
              ></ion-input>
            </ion-item>
            <ion-item>
              <ion-input
                v-model="password"
                name="password"
                label="Password"
                label-placement="stacked"
                autocomplete="new-password"
                type="password"
              ></ion-input>
            </ion-item>
            <ion-item>
              <ion-input
                v-model="verifypassword"
                name="Verify Password"
                label="Verify Password"
                label-placement="stacked"
                autocomplete="new-password"
                type="password">
                </ion-input>
            </ion-item>
            <div class="ion-text-center" v-if="password && password==verifypassword">
              <ion-button type="submit" fill="clear">Register</ion-button>
            </div>
          </form>
        </ion-list>
      </ion-content>
    </ion-page>
  </template>
  
  <script setup lang="ts">
  import {
    IonContent,
    IonHeader,
    IonPage,
    IonTitle,
    IonToolbar,
    IonList,
    IonItem,
    IonInput,
    IonButton,
    useIonRouter,
  } from "@ionic/vue";
  import { ref } from "vue";
  
  const email = ref("");
  const password = ref("");
  const verifypassword = ref("");
  const router = useIonRouter();
  
  const handleLogin = async () => {
    try {
      const resp = await fetch("http://localhost:3000/api/Users/login", {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: email.value,
          password: password.value,
        }),
      });
  
      if (!resp.ok) {
        const errorMsg = (await resp.json())?.errors[0].message;
        throw new Error(errorMsg);
      }
      const user = await resp.json();
      console.log(user);
  
      // goto home
      router.replace("/dashboard");
    } catch (error: any) {
      alert("Sign In Error " + error.message);
      return;
    }
  };
  const handleRegister = async () => {
    try {
      const resp = await fetch("http://localhost:3000/api/Users", {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: email.value,
          password: password.value,
        }),
      });
  
      if (!resp.ok) {
        const errorMsg = (await resp.json())?.errors[0].message;
        throw new Error(errorMsg);
      }
      const user = await resp.json();
      console.log(user);
  
    } catch (error: any) {
      alert("Sign In Error " + error.message);
      return;
    }
    handleLogin();
  };
  
  </script>
  
  <style scoped>
  
  </style>
  