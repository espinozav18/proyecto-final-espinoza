<template>
  <v-container class="grey lighten-5">
    <v-row>
      <v-col>
        <v-card class="pa-2"
          outlined
          tile>
          <v-card-title>Sedes</v-card-title>
          <v-card-text  align="start">
            <v-list-item>
              <v-list-item-content>
                <v-list-item-title>Tienda Centro civico</v-list-item-title>
              </v-list-item-content>
            </v-list-item>

            <v-list-item two-line>
              <v-list-item-content>
                <v-list-item-title>Horarios</v-list-item-title>
                <v-list-item-subtitle>Lunes - Sábados (9:00 a 17:00) </v-list-item-subtitle>
              </v-list-item-content>
            </v-list-item>

            <v-list-item three-line>
              <v-list-item-content>
                <v-list-item-title>Dirección</v-list-item-title>
                <v-list-item-subtitle>
                  Av. Bolivia 109, Cercado de Lima 15001 (Stand 425)
                </v-list-item-subtitle>
                <v-list-item-subtitle>
                  Av. Bolivia 109, Cercado de Lima 15001 (Stand 125)
                </v-list-item-subtitle>
              </v-list-item-content>
            </v-list-item>
          </v-card-text>
        </v-card>
      </v-col>
      <v-col>
        <v-card class="pa-2"
          outlined
          tile>
          <v-card-text>
            <v-sheet>
              <iframe
             
              src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d2320.0359278388055!2d-77.03593645248164!3d-12.055917081138395!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x9105c8c6eea53a21%3A0x759617a9c2ce937d!2sTorre%20Centro%20C%C3%ADvico!5e0!3m2!1ses-419!2spe!4v1639428626287!5m2!1ses-419!2spe"
              width="100%"
              height="450"
              style="border: 0"
              allowfullscreen=""
              loading="lazy"
          >
            </iframe>
            </v-sheet>
            
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  data: () => ({
    items: [
      {
        icon: "mdi-wifi",
        text: "Wifi",
      },
      {
        icon: "mdi-bluetooth",
        text: "Bluetooth",
      },
      {
        icon: "mdi-chart-donut",
        text: "Data Usage",
      },
    ],
    model: 1,
  }),
};
</script>

<style lang="scss" scoped>
</style>
