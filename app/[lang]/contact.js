

export default function Contact() {
    return (
      <div className="p-10">
        <h1 className="text-3xl font-bold">Contáctanos</h1>
        <form action="https://formspree.io/f/mkgngwbj" method="POST" className="mt-5 space-y-4">
          <div>
            <label className="block text-lg text-gray-700">Nombre</label>
            <input type="text" name="name" className="border border-gray-300 p-2 w-full" required />
          </div>
          <div>
            <label className="block text-lg text-gray-700">Email</label>
            <input type="email" name="email" className="border border-gray-300 p-2 w-full" required />
          </div>
          <div>
            <label className="block text-lg text-gray-700">Mensaje</label>
            <textarea name="message" className="border border-gray-300 p-2 w-full" rows="4" required></textarea>
          </div>
          <button type="submit" className="bg-blue-600 text-white py-2 px-4 rounded">Enviar</button>
        </form>
      </div>
    );
  }

  