const { Schema, model } = require('mongoose')

const letterSchema = new Schema(
  {
    noSurat: {
      type: String
    },
    kopPemerintah: {
      type: String
    },
    kopDinas: {
      type: String
    },
    kopAlamat: {
      type: String
    },
    kopTelpon: {
      type: String
    },
    tanggalSurat: {
      type: String
    },
    lampiran: {
      type: String
    },
    perihal: {
      type: String
    },
    kepada: {
      type: String
    },
    kontenPembuka: {
      type: String
    },
    tanggal: {
      type: String
    },
    jam: {
      type: String
    },
    tempatPelaksanaan: {
      type: String
    },
    kontenPenutup: {
      type: String
    },
    jabatan1: {
      type: String
    },
    nama1: {
      type: String
    },
    jabatan2: {
      type: String
    },
    nama2: {
      type: String
    },
    jabatan3: {
      type: String
    },
    nama3: {
      type: String
    },
    totalTandaTangan: {
      type: Number
    },
    logo: {
      type: String
    }
  },
  {
    timestamps: true,
    versionKey: false
  }
)

module.exports = model('Letter', letterSchema)
