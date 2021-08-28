import NuxtGenerator from "./generators/NuxtGenerator";
import VueGenerator from "./generators/VueGenerator";
import VuetifyGenerator from "./generators/VuetifyGenerator";
import QuasarGenerator from "./generators/QuasarGenerator";

function wrap(cl) {
  return ({ hydraPrefix, templateDirectory }) =>
    new cl({ hydraPrefix, templateDirectory });
}

export default function generators(generator = "react") {
  switch (generator) {
    case "nuxt":
      return wrap(NuxtGenerator);
    case "vue":
      return wrap(VueGenerator);
    case "vuetify":
      return wrap(VuetifyGenerator);
    case "quasar":
      return wrap(QuasarGenerator);
  }
}
