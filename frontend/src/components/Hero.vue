<template>
    <div class="picturew">
          <section class="grid grid-cols-2 mt-20 mb-40">
        <div class="flex justify-center self-center">
            <div class="flex flex-col">
                <div class="text-4xl">
                    <h2 class="leading-relaxed"><strong>A variety of delicious cuisine,</strong> <br> It's in Your Hands</h2>
                </div>
                <div class="py-4 text-lg">
                    <p style="color: aliceblue;">Let's immediately choose and order your favorite food</p>
                </div>
                <div class="my-4">
                    <router-link to="/foods" class="rounded-full py-2 px-3 uppercase text-xs font-bold cursor-pointer tracking-wide text-white bg-green-400">Order Now</router-link>
                </div>
            </div>
        </div>
        <div class="w-10/12">
            <img src="../assets/images/hero.png" alt="Hero">
        </div>
    </section>
    </div>
  
</template>

<style>
    .picturew{
        background-color: rgba(36, 52, 43, 0.85);
        /* background-image: url('../assets/images/.jpg'); */
        background-size: cover;
        background-position: center;
        background-repeat: no-repeat;
    }
</style>