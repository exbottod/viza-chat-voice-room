/**
 * Halaman yang belum dipindahkan ke React.
 * Panel lama tetap bisa dipakai untuk halaman ini lewat tautan di bawah,
 * jadi tidak ada fitur yang hilang selama pemindahan bertahap.
 */
export default function Belum({ nama, judul }) {
  return (
    <div className="panel">
      <div className="panelAtas"><h3>{judul}</h3></div>
      <div className="kosong">
        Halaman <b>{judul}</b> belum dipindahkan ke React.
        <br /><br />
        Sementara ini bisa dibuka di panel lama: <a href={"../panel/admin/#" + nama}>panel lama #{nama}</a>
      </div>
    </div>
  );
}
