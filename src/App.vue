<template>
  <div ref="container" id="contatiner">
    <h1 ref="text" id="text">{{ text }}</h1>
    <div id="cursor" v-if="show"></div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      partIndex: 0,
      part: 0,
      show: false,
      text: '',
      intervalValue: () => {},
      content: [
        ['Cuman', 400],
        ['Mau', 400],
        ['Bilang', 700],
        ['Semangat Nugasnya 💪💪💪', 2000],
        ['Ingat kata kata ini:', 1000],
        ['勉強の疲れに耐えられないなら、愚かさの痛みに耐えなければならない.'],
        ['Kalau ditranslate,', 400],
        [
          'Mereka yang tidak sanggup menahan lelahnya belajar, harus sanggup menahan perihnya kebodohan. \n -Imam Syafii',
          4000,
          20,
        ],
        ['Gila keren bet gw ☕☕'],
      ],
    };
  },
  methods: {
    increment: function () {
      this.partIndex++;
    },
    decrement: function () {
      this.partIndex--;
    },
    delete() {
      this.$data.text = this.$data.content[this.$data.part][0].substring(
        0,
        this.$data.partIndex - 1
      );

      this.decrement();
      // If sentence has been deleted then start to display the next sentence
      if (this.$data.text === '') {
        clearInterval(this.$data.intervalValue);

        // If current sentence was last then display the first one, else move to the next
        if (this.$data.part == this.$data.content.length - 1)
          this.$data.part = 0;
        else this.$data.part++;

        this.$data.partIndex = 0;

        // Start to display the next sentence after some time
        setTimeout(() => {
          this.$data.show = true;
          this.$data.intervalValue = setInterval(this.type, 80);
        }, 200);
      }
    },
    type() {
      // Get substring with 1 characater added
      this.$data.text = this.$data.content[this.$data.part][0].substring(
        0,
        this.$data.partIndex + 1
      );
      this.increment();

      // If full sentence has been displayed then start to delete the sentence after some time
      if (this.$data.text === this.$data.content[this.$data.part][0]) {
        // show the cursor

        this.$data.show = false;

        clearInterval(this.$data.intervalValue);
        setTimeout(() => {
          if (this.$data.part !== this.$data.content.length - 1)
            this.$data.intervalValue = setInterval(
              this.delete,
              this.$data.content[this.$data.part][2] || 50
            );
          clearInterval(this.type);
        }, this.$data.content[this.$data.part][1] || 1000);
      }
    },
  },
  mounted: function mounted() {
    // List of sentences

    this.$data.intervalValue = setInterval(this.type, 100);
  },
};
</script>

<style scoped>
#container {
  text-align: center;
}

#text {
  display: inline-block;
  vertical-align: middle;
  color: #ffffff;
  letter-spacing: 2px;
}

#cursor {
  display: inline-block;
  vertical-align: middle;
  width: 3px;
  height: 50px;
  background-color: orange;
  animation: blink 0.75s step-end infinite;
}

@keyframes blink {
  from,
  to {
    background-color: transparent;
  }
  50% {
    background-color: orange;
  }
}
</style>
