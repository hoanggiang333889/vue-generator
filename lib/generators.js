import NuxtGenerator from "./generators/NuxtGenerator";
import VueGenerator from "./generators/VueGenerator";
import VuetifyGenerator from "./generators/VuetifyGenerator";

function wrap(cl) {
  return ({
    hydraPrefix,
    templateDirectory
  }) => new cl({
    hydraPrefix,
    templateDirectory
  });
}

export default function generators(generator = "nuxt") {
  switch (generator) {
    case "nuxt":
      return wrap(NuxtGenerator);

    case "vue":
      return wrap(VueGenerator);

    case "vuetify":
      return wrap(VuetifyGenerator);
  }
}