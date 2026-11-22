/**
 * Halaman yang belum dipindahkan ke React.
 * Tidak ada tautan ke panel lama lagi: semua alat ada di panel React ini.
 */
export default function Belum({ nama, judul }) {
  return (
    <div className="panel">
      <div className="panelAtas"><h3>{judul}</h3></div>
      <div className="kosong">
        Halaman <b>{judul}</b> belum dipindahkan ke React.
        <br /><br />
        Halaman ini sedang disiapkan di panel React: <b>#{nama}</b>
      </div>
    </div>
  );
}
