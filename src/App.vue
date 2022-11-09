<template>
  <div ref="container" id="contatiner">
    <h1 ref="text" id="text">{{ text }}</h1>
    <div id="cursor" v-if="show"></div>
    <div>
      <img
        style="margin-top: 16px"
        :src="imageUrl"
        alt="img"
        v-if="imageUrl && !show"
      />
    </div>
  </div>
</template>

<script>
import jsonTxt from './json/text.json';

export default {
  data() {
    return {
      partIndex: 0,
      part: 0,
      show: false,
      text: '',
      imageUrl: '',
      intervalValue: () => {},
      content: [],
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
      const text =
        typeof this.$data.content[this.$data.part][0] === 'string'
          ? this.$data.content[this.$data.part][0]
          : this.$data.content[this.$data.part][0]['text'];

      this.$data.text = text.substring(0, this.$data.partIndex - 1);

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
      const text =
        typeof this.$data.content[this.$data.part][0] === 'string'
          ? this.$data.content[this.$data.part][0]
          : this.$data.content[this.$data.part][0]['text'];

      const effect =
        typeof this.$data.content[this.$data.part][0] === 'string'
          ? null
          : this.$data.content[this.$data.part][0]['effect'];

      if (effect === 'confetti') {
        this.$confetti.start();
      }

      if (effect === 'image') {
        this.$data.imageUrl =
          this.$data.content[this.$data.part][0]['imageUrl'];
      }

      // Get substring with 1 characater added
      this.$data.text = text.substring(0, this.$data.partIndex + 1);
      this.increment();

      // If full sentence has been displayed then start to delete the sentence after some time
      if (this.$data.text === text) {
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

    let urlParams = new URLSearchParams(window.location.search);

    this.$data.content = jsonTxt[urlParams.get('txt')];
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
