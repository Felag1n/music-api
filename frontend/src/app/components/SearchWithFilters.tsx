import { useState, useRef, useEffect } from "react";

interface SearchWithFiltersProps {
  setIsSearchOpen: (isOpen: boolean) => void; // Пропс для закрытия модального окна
}

const SearchWithFilters: React.FC<SearchWithFiltersProps> = ({ setIsSearchOpen }) => {
  const modalRef = useRef<HTMLDivElement | null>(null);

  // Список фильтров для примера
  const genres = ["Rock", "Pop", "Hip-Hop", "Jazz", "Classical"];
  const languages = ["English", "Russian", "Spanish", "French", "German"];
  const moods = ["Happy", "Sad", "Energetic", "Calm"];

  const [selectedGenres, setSelectedGenres] = useState<string[]>([]);
  const [selectedLanguages, setSelectedLanguages] = useState<string[]>([]);
  const [selectedMood, setSelectedMood] = useState<string>("");
  const [yearRange, setYearRange] = useState<{ min: number; max: number }>({
    min: 1990,
    max: 2024,
  });

  const toggleGenre = (genre: string) => {
    setSelectedGenres((prevGenres) =>
      prevGenres.includes(genre)
        ? prevGenres.filter((g) => g !== genre)
        : [...prevGenres, genre]
    );
  };

  const toggleLanguage = (language: string) => {
    setSelectedLanguages((prevLanguages) =>
      prevLanguages.includes(language)
        ? prevLanguages.filter((l) => l !== language)
        : [...prevLanguages, language]
    );
  };

  const handleSearch = () => {
    const filters = {
      genres: selectedGenres,
      languages: selectedLanguages,
      mood: selectedMood,
      yearRange,
    };
    // Здесь ты можешь отправить данные на сервер или в другой компонент
    console.log("Ищем с фильтрами: ", filters);
  };

  const handleReset = () => {
    setSelectedGenres([]);
    setSelectedLanguages([]);
    setSelectedMood("");
    setYearRange({ min: 1990, max: 2024 });
  };

  // Закрытие модального окна при клике вне его
  const handleClickOutside = (event: MouseEvent) => {
    if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
      setIsSearchOpen(false); // Закрываем модальное окно при клике вне его области
    }
  };

  // Добавляем обработчик кликов при открытии модального окна
  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Размытие фона */}
      <div className="fixed inset-0 bg-gray-900 bg-opacity-90 backdrop-blur-sm"></div>

      {/* Модальное окно */}
      <div
        ref={modalRef}
        className="relative bg-gray-800 text-white rounded-md p-6 z-10 max-w-lg w-full"
      >
        <h2 className="text-2xl mb-6 text-center">Фильтр поиска песен</h2>

        {/* Ввод для поиска */}
        <input
          type="text"
          placeholder="Введите название или начните с @"
          className="w-full mb-4 p-2 bg-gray-700 text-white rounded-md"
        />

        {/* Фильтры */}
        <div className="mb-6">
          <h3 className="text-lg mb-2">Жанры</h3>
          <div className="flex flex-wrap gap-2">
            {genres.map((genre) => (
              <label key={genre} className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={selectedGenres.includes(genre)}
                  onChange={() => toggleGenre(genre)}
                  className="form-checkbox h-5 w-5 text-purple-600"
                />
                <span>{genre}</span>
              </label>
            ))}
          </div>
        </div>

        <div className="mb-6">
          <h3 className="text-lg mb-2">Язык исполнения</h3>
          <div className="flex flex-wrap gap-2">
            {languages.map((language) => (
              <label key={language} className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={selectedLanguages.includes(language)}
                  onChange={() => toggleLanguage(language)}
                  className="form-checkbox h-5 w-5 text-purple-600"
                />
                <span>{language}</span>
              </label>
            ))}
          </div>
        </div>

        <div className="mb-6">
          <h3 className="text-lg mb-2">Настроение</h3>
          <select
            value={selectedMood}
            onChange={(e) => setSelectedMood(e.target.value)}
            className="w-full p-2 bg-gray-700 text-white rounded-md"
          >
            <option value="">Выберите настроение</option>
            {moods.map((mood) => (
              <option key={mood} value={mood}>
                {mood}
              </option>
            ))}
          </select>
        </div>

        <div className="mb-6">
          <h3 className="text-lg mb-2">Год выпуска</h3>
          <div className="flex gap-2">
            <input
              type="number"
              className="w-full p-2 bg-gray-700 text-white rounded-md"
              value={yearRange.min}
              onChange={(e) =>
                setYearRange({ ...yearRange, min: parseInt(e.target.value) || 1990 })
              }
              placeholder="От"
            />
            <input
              type="number"
              className="w-full p-2 bg-gray-700 text-white rounded-md"
              value={yearRange.max}
              onChange={(e) =>
                setYearRange({ ...yearRange, max: parseInt(e.target.value) || 2024 })
              }
              placeholder="До"
            />
          </div>
        </div>

        {/* Кнопки */}
        <div className="flex justify-between">
          <button
            onClick={handleSearch}
            className="bg-purple-600 p-3 rounded-md hover:bg-purple-800"
          >
            Найти
          </button>
          <button
            onClick={handleReset}
            className="bg-red-500 p-3 rounded-md hover:bg-red-700"
          >
            Сбросить фильтры
          </button>
        </div>
      </div>
    </div>
  );
};

export default SearchWithFilters;
