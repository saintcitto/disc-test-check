import React, { useState, useEffect } from "react";
import {
	RefreshCcw,
	Check,
	X,
	Star,
	Zap,
	Heart,
	Brain,
	Share2,
	Sparkles,
	Loader2,
} from "lucide-react";

const questionsData = [
	{
		id: 1,
		options: [
			{ label: "Mudah Bergaul", type: "I" },
			{ label: "Penuh Keyakinan", type: "D" },
			{ label: "Dapat Menahan Diri", type: "S" },
			{ label: "Teliti / Cermat", type: "C" },
		],
	},
	{
		id: 2,
		options: [
			{ label: "Berani Mengambil Risiko", type: "D" },
			{ label: "Menyenangkan", type: "I" },
			{ label: "Suka Mengalah", type: "S" },
			{ label: "Suka Ketepatan", type: "C" },
		],
	},
	{
		id: 3,
		options: [
			{ label: "Suka Bersaing", type: "D" },
			{ label: "Mudah Tersentuh", type: "I" },
			{ label: "Ramah / Baik Hati", type: "S" },
			{ label: "Sistematis", type: "C" },
		],
	},
	{
		id: 4,
		options: [
			{ label: "Suka Mengatur", type: "D" },
			{ label: "Periang / Ceria", type: "I" },
			{ label: "Suka Membantu", type: "S" },
			{ label: "Taat Peraturan", type: "C" },
		],
	},
	{
		id: 5,
		options: [
			{ label: "Mandiri", type: "D" },
			{ label: "Suka Bicara", type: "I" },
			{ label: "Sabar", type: "S" },
			{ label: "Disiplin", type: "C" },
		],
	},
	{
		id: 6,
		options: [
			{ label: "Tegas", type: "D" },
			{ label: "Antusias", type: "I" },
			{ label: "Setia", type: "S" },
			{ label: "Logis", type: "C" },
		],
	},
	{
		id: 7,
		options: [
			{ label: "Berkemauan Keras", type: "D" },
			{ label: "Optimis", type: "I" },
			{ label: "Tenang", type: "S" },
			{ label: "Suka Menganalisa", type: "C" },
		],
	},
	{
		id: 8,
		options: [
			{ label: "Berani", type: "D" },
			{ label: "Populer", type: "I" },
			{ label: "Pendengar Baik", type: "S" },
			{ label: "Sempurna (Perfeksionis)", type: "C" },
		],
	},
	{
		id: 9,
		options: [
			{ label: "Kompetitif", type: "D" },
			{ label: "Ceria", type: "I" },
			{ label: "Perhatian", type: "S" },
			{ label: "Terorganisir", type: "C" },
		],
	},
	{
		id: 10,
		options: [
			{ label: "Petualang", type: "D" },
			{ label: "Inspiratif", type: "I" },
			{ label: "Ramah Tamah", type: "S" },
			{ label: "Hati-hati", type: "C" },
		],
	},
	{
		id: 11,
		options: [
			{ label: "Terus Terang", type: "D" },
			{ label: "Persuasif", type: "I" },
			{ label: "Rendah Hati", type: "S" },
			{ label: "Objektif", type: "C" },
		],
	},
	{
		id: 12,
		options: [
			{ label: "Inovatif", type: "D" },
			{ label: "Suka Tampil", type: "I" },
			{ label: "Penengah", type: "S" },
			{ label: "Analitis", type: "C" },
		],
	},
	{
		id: 13,
		options: [
			{ label: "Berorientasi Hasil", type: "D" },
			{ label: "Spontan", type: "I" },
			{ label: "Loyal", type: "S" },
			{ label: "Standar Tinggi", type: "C" },
		],
	},
	{
		id: 14,
		options: [
			{ label: "Mengambil Kendali", type: "D" },
			{ label: "Suka Humor", type: "I" },
			{ label: "Pendamai", type: "S" },
			{ label: "Faktual", type: "C" },
		],
	},
	{
		id: 15,
		options: [
			{ label: "Tidak Kenal Takut", type: "D" },
			{ label: "Mempesona", type: "I" },
			{ label: "Simpatik", type: "S" },
			{ label: "Konsisten", type: "C" },
		],
	},
];

const personalityTypes = {
	D: {
		name: "DOMINANCE",
		alias: "The Boss / The Commander",
		color: "bg-red-500",
		textColor: "text-red-500",
		borderColor: "border-red-500",
		icon: Zap,
		traits: ["Tegas", "Berorientasi Hasil", "Suka Tantangan", "Direct"],
		desc: "Kamu punya 'Main Character Energy'. Kamu suka memimpin, to the point, dan gak suka buang waktu. Vibe kamu kuat dan ambisius. Orang melihat kamu sebagai sosok yang bisa diandalkan untuk mengambil keputusan sulit.",
		weakness:
			"Kadang bisa kelihatan terlalu bossy atau kurang peka sama perasaan orang lain.",
	},
	I: {
		name: "INFLUENCE",
		alias: "The Socialite / The Influencer",
		color: "bg-yellow-400",
		textColor: "text-yellow-600",
		borderColor: "border-yellow-400",
		icon: Sparkles,
		traits: ["Antusias", "Optimis", "Suka Bicara", "Kreatif"],
		desc: "Kamu adalah 'Life of the Party'. Di mana ada kamu, di situ suasana jadi hidup. Kamu jago banget ngomong dan meyakinkan orang lain. Networking is your superpower.",
		weakness: "Kadang kurang detail dan suka lompat-lompat fokusnya.",
	},
	S: {
		name: "STEADINESS",
		alias: "The Peacemaker / The Bestie",
		color: "bg-green-500",
		textColor: "text-green-600",
		borderColor: "border-green-500",
		icon: Heart,
		traits: ["Sabar", "Setia", "Pendengar Baik", "Konsisten"],
		desc: "Kamu itu 'Comfort Character' buat banyak orang. Tenang, suportif, dan gak suka drama. Kamu lebih suka kerja sama tim daripada kompetisi yang sikut-sikutan. Loyalty tier atas.",
		weakness:
			"Sering susah bilang 'Tidak' dan cenderung menghindari konflik meskipun perlu.",
	},
	C: {
		name: "COMPLIANCE",
		alias: "The Analyst / The Strategist",
		color: "bg-blue-500",
		textColor: "text-blue-600",
		borderColor: "border-blue-500",
		icon: Brain,
		traits: ["Teliti", "Logis", "Sistematis", "Akurat"],
		desc: "Kamu si 'Big Brain'. Segala sesuatu harus ada datanya. Kamu perfeksionis dan punya standar tinggi. Orang suka nanya ke kamu karena kamu selalu punya jawaban yang valid dan riset yang mendalam.",
		weakness:
			"Kadang terlalu kaku sama aturan dan overthinking (analysis paralysis).",
	},
};

const Header = () => {
	const [imgError, setImgError] = useState(false);

	return (
		<header className="w-full border-b-4 border-black bg-white sticky top-0 z-50 transition-all duration-300">
			<div className="flex justify-between items-center p-3 md:p-4 max-w-5xl mx-auto">
				<div className="flex items-center gap-2 md:gap-3 group cursor-pointer">
					{!imgError ? (
						<img
							src="/image_595e21.png"
							alt="DISC Logo"
							onError={() => setImgError(true)}
							className="w-8 h-8 md:w-10 md:h-10 object-contain group-hover:rotate-12 transition-transform duration-300 drop-shadow-[2px_2px_0px_rgba(0,0,0,1)]"
						/>
					) : (
						<div className="w-8 h-8 md:w-10 md:h-10 bg-black flex items-center justify-center group-hover:rotate-12 transition-transform duration-300 shadow-[2px_2px_0px_rgba(0,0,0,1)]">
							<Zap className="text-[#ccff00] w-5 h-5 md:w-6 md:h-6" />
						</div>
					)}
					{/* Teks judul dibuat lebih adaptif dengan text-lg di mobile */}
					<h1 className="text-lg sm:text-xl md:text-2xl font-black tracking-tighter italic group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-purple-500 group-hover:to-pink-500 transition-all">
						DISC CHECK
					</h1>
				</div>
				<div className="hidden sm:flex gap-2 md:gap-4 font-bold text-[10px] sm:text-xs md:text-sm">
					<span className="bg-yellow-300 px-2 py-1 border-2 border-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] hover:-translate-y-1 transition-transform cursor-default whitespace-nowrap">
						KNOW YOURSELF
					</span>
					<span className="bg-purple-300 px-2 py-1 border-2 border-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] hover:-translate-y-1 transition-transform cursor-default whitespace-nowrap">
						NO CAP
					</span>
				</div>
			</div>
		</header>
	);
};

const Button = ({
	children,
	onClick,
	variant = "primary",
	className = "",
	disabled = false,
}) => {
	// Padding dan ukuran text disesuaikan agar tidak terlalu besar di mobile
	const baseStyle =
		"font-bold border-2 border-black px-4 py-3 md:px-6 md:py-3 transition-all transform duration-100 disabled:opacity-50 disabled:cursor-not-allowed active:scale-95 text-sm md:text-base cursor-pointer tracking-wide";
	const variants = {
		primary:
			"bg-[#ccff00] text-black hover:bg-[#b3e600] shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] md:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:translate-y-1 hover:shadow-none active:translate-y-1 active:shadow-none",
		secondary:
			"bg-white text-black hover:bg-gray-100 shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] md:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:translate-y-1 hover:shadow-none",
		danger:
			"bg-[#ff00ff] text-white shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] md:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:translate-y-1 hover:shadow-none",
	};

	return (
		<button
			onClick={onClick}
			disabled={disabled}
			className={`${baseStyle} ${variants[variant]} ${className}`}
		>
			{children}
		</button>
	);
};

export default function App() {
	const [step, setStep] = useState("intro");
	const [answers, setAnswers] = useState({});
	const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
	const [scores, setScores] = useState({ D: 0, I: 0, S: 0, C: 0 });
	const [dominantType, setDominantType] = useState(null);

	const handleStart = () => {
		setStep("test");
		setAnswers({});
		setCurrentQuestionIndex(0);
		window.scrollTo(0, 0);
	};

	const handleSelect = (questionId, type, value) => {
		const currentAnswer = answers[questionId] || {};
		let newAnswer = { ...currentAnswer, [type]: value };

		if (type === "most" && newAnswer.least === value) {
			newAnswer.least = null;
		}
		if (type === "least" && newAnswer.most === value) {
			newAnswer.most = null;
		}

		setAnswers({
			...answers,
			[questionId]: newAnswer,
		});
	};

	const isCurrentQuestionComplete = () => {
		const currentQId = questionsData[currentQuestionIndex].id;
		const ans = answers[currentQId];
		return ans && ans.most && ans.least;
	};

	const handleNext = () => {
		if (currentQuestionIndex < questionsData.length - 1) {
			setCurrentQuestionIndex((prev) => prev + 1);
			window.scrollTo(0, 0);
		} else {
			setStep("calculating");
			setTimeout(() => calculateResult(), 2500);
		}
	};

	const calculateResult = () => {
		let rawScores = { D: 0, I: 0, S: 0, C: 0 };
		Object.values(answers).forEach((ans) => {
			if (ans.most) rawScores[ans.most]++;
		});

		let maxScore = -1;
		let type = "D";
		Object.entries(rawScores).forEach(([key, val]) => {
			if (val > maxScore) {
				maxScore = val;
				type = key;
			}
		});

		setScores(rawScores);
		setDominantType(type);
		setStep("result");
		window.scrollTo(0, 0);
	};

	const handleShare = async () => {
		if (!dominantType) return;

		const typeData = personalityTypes[dominantType];
		const shareText = `💀 DISC CHECK 💀\n\nMY VIBE: ${typeData.name}\nAKA: ${
			typeData.alias
		}\n\n"${typeData.traits.join(" + ")}"\n\nCek vibe lo sekarang! 🔥`;

		if (navigator.share) {
			try {
				await navigator.share({
					title: "DISC CHECK",
					text: shareText,
				});
				return;
			} catch (err) {}
		}

		try {
			const textarea = document.createElement("textarea");
			textarea.value = shareText;
			document.body.appendChild(textarea);
			textarea.select();
			document.execCommand("copy");
			document.body.removeChild(textarea);
			alert("Text hasil sudah dicopy! Paste di Story/Twitter lo! 🔥");
		} catch (err) {
			alert("Manual screenshot aja bro! 📸");
		}
	};

	return (
		<div className="min-h-screen bg-[#f0f0f0] text-black font-mono selection:bg-[#ff00ff] selection:text-white overflow-x-hidden">
			<Header />

			<main className="max-w-3xl mx-auto p-4 md:p-6 flex flex-col items-center justify-center min-h-[85vh]">
				{step === "intro" && (
					<div className="flex flex-col gap-6 md:gap-8 w-full animate-in slide-in-from-bottom-4 duration-700">
						<div className="border-4 border-black bg-white p-5 md:p-8 shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] md:shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] relative overflow-hidden group hover:shadow-[10px_10px_0px_0px_rgba(0,0,0,1)] transition-all duration-300">
							<div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-[#ccff00] via-[#ff00ff] to-[#00ffff] animate-[pulse_2s_infinite]"></div>
							{/* Responsif untuk font judul utama, mulai dari 3xl di mobile */}
							<h2 className="text-3xl sm:text-5xl md:text-7xl font-black mb-4 md:mb-6 uppercase leading-tight italic break-words">
								Discover
								<br />
								Your
								<br />
								<span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-pink-600 animate-pulse">
									Persona
								</span>
							</h2>
							<p className="text-sm sm:text-base md:text-xl font-bold mb-4 leading-relaxed">
								Bukan psikotes biasa. Cari tahu apakah kamu "The Boss", "The
								Influencer", "The Bestie", atau "The Strategist".
							</p>
							<div className="bg-black text-white p-3 md:p-4 font-bold text-xs sm:text-sm md:text-base inline-block rotate-1 mb-4 md:mb-6 hover:rotate-2 transition-transform">
								⚠️ WARNING: HASIL TERLALU AKURAT
							</div>

							<div className="space-y-3 text-xs sm:text-sm md:text-base border-t-2 border-black pt-4">
								<p className="flex items-center gap-3">
									<Check className="w-4 h-4 md:w-5 md:h-5 flex-shrink-0" />{" "}
									Pilih 1 kata yang <strong>PALING (M)</strong> menggambarkan
									dirimu.
								</p>
								<p className="flex items-center gap-3">
									<X className="w-4 h-4 md:w-5 md:h-5 flex-shrink-0" /> Pilih 1
									kata yang <strong>PALING TIDAK (L)</strong> menggambarkan
									dirimu.
								</p>
							</div>
						</div>

						<Button
							onClick={handleStart}
							className="w-full md:w-auto self-center text-lg md:text-xl animate-bounce"
						>
							LET'S GOOOO 🚀
						</Button>
					</div>
				)}

				{step === "test" && (
					<div className="w-full max-w-2xl">
						<div className="flex justify-between items-end mb-3 md:mb-4 font-bold">
							<span className="text-lg sm:text-xl md:text-2xl italic">
								QUESTION {currentQuestionIndex + 1}{" "}
								<span className="text-gray-400 text-sm sm:text-base md:text-lg">
									/ {questionsData.length}
								</span>
							</span>
							<div className="h-3 md:h-4 w-24 md:w-32 border-2 border-black p-0.5">
								<div
									className="h-full bg-[#ff00ff] transition-all duration-500 ease-out"
									style={{
										width: `${
											((currentQuestionIndex + 1) / questionsData.length) * 100
										}%`,
									}}
								></div>
							</div>
						</div>

						<div
							key={currentQuestionIndex}
							className="animate-in slide-in-from-right-8 duration-500 border-4 border-black bg-white shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] md:shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]"
						>
							{/* Kolom dibuat responsif, width checkbox tetap, kolom text fleksibel */}
							<div className="grid grid-cols-[1fr_45px_45px] sm:grid-cols-[1fr_50px_50px] md:grid-cols-[1fr_80px_80px] gap-2 p-3 md:p-4 bg-black text-white font-bold text-center border-b-4 border-black text-xs sm:text-sm md:text-base">
								<div className="text-left pl-1 md:pl-2 flex items-center">
									KATA SIFAT
								</div>
								<div className="bg-[#ccff00] text-black border border-white flex items-center justify-center rounded-sm h-full min-h-[30px]">
									M
								</div>
								<div className="bg-[#ff00ff] text-black border border-white flex items-center justify-center rounded-sm h-full min-h-[30px]">
									L
								</div>
							</div>

							<div className="divide-y-2 divide-black">
								{questionsData[currentQuestionIndex].options.map((opt, idx) => {
									const qId = questionsData[currentQuestionIndex].id;
									const isMost = answers[qId]?.most === opt.type;
									const isLeast = answers[qId]?.least === opt.type;

									return (
										<div
											key={idx}
											className="grid grid-cols-[1fr_45px_45px] sm:grid-cols-[1fr_50px_50px] md:grid-cols-[1fr_80px_80px] gap-2 p-3 md:p-4 items-center hover:bg-gray-50 transition-colors group min-h-[60px]"
										>
											{/* Font size opsi dibuat dinamis dan break-words agar tidak overflow */}
											<div className="font-bold text-sm sm:text-base md:text-xl group-hover:translate-x-1 transition-transform leading-snug break-words pr-2">
												{opt.label}
											</div>

											<div className="flex justify-center items-center h-full">
												<button
													onClick={() => handleSelect(qId, "most", opt.type)}
													className={`w-9 h-9 sm:w-10 sm:h-10 md:w-12 md:h-12 border-2 border-black transition-all flex items-center justify-center shadow-[2px_2px_0px_0px_rgba(0,0,0,0.5)] active:scale-90 cursor-pointer flex-shrink-0
                             ${
																isMost
																	? "bg-[#ccff00] translate-y-0.5 translate-x-0.5 shadow-none"
																	: "bg-white hover:bg-[#eeffcc]"
															}
                           `}
												>
													{isMost && (
														<Check className="w-5 h-5 sm:w-6 sm:h-6 stroke-[3] animate-in zoom-in duration-200" />
													)}
												</button>
											</div>

											<div className="flex justify-center items-center h-full">
												<button
													onClick={() => handleSelect(qId, "least", opt.type)}
													className={`w-9 h-9 sm:w-10 sm:h-10 md:w-12 md:h-12 border-2 border-black transition-all flex items-center justify-center shadow-[2px_2px_0px_0px_rgba(0,0,0,0.5)] active:scale-90 cursor-pointer flex-shrink-0
                             ${
																isLeast
																	? "bg-[#ff00ff] translate-y-0.5 translate-x-0.5 shadow-none text-white"
																	: "bg-white hover:bg-[#ffccff]"
															}
                           `}
												>
													{isLeast && (
														<X className="w-5 h-5 sm:w-6 sm:h-6 stroke-[3] animate-in zoom-in duration-200" />
													)}
												</button>
											</div>
										</div>
									);
								})}
							</div>
						</div>

						<div className="mt-6 md:mt-8 flex justify-center pb-8">
							<Button
								onClick={handleNext}
								disabled={!isCurrentQuestionComplete()}
								className="w-full text-base md:text-lg animate-in fade-in duration-500"
							>
								{currentQuestionIndex === questionsData.length - 1
									? "REVEAL MY VIBE ✨"
									: "NEXT QUESTION 👉"}
							</Button>
						</div>
					</div>
				)}

				{step === "calculating" && (
					<div className="flex flex-col items-center justify-center animate-in fade-in zoom-in duration-500 px-4 text-center">
						<Loader2 className="w-12 h-12 md:w-20 md:h-20 animate-spin text-black mb-4 md:mb-6" />
						<h2 className="text-xl md:text-3xl font-black italic mb-2">
							CALCULATING VIBE...
						</h2>
						<p className="font-mono text-sm md:text-lg animate-pulse">
							Analyzing your choices...
						</p>
						<div className="mt-6 md:mt-8 w-40 md:w-64 h-3 md:h-4 border-2 border-black p-0.5">
							<div className="h-full bg-[#ccff00] animate-[pulse_1s_infinite]"></div>
						</div>
					</div>
				)}

				{step === "result" && dominantType && (
					<div className="w-full max-w-4xl animate-in slide-in-from-bottom-8 duration-700 pb-8">
						<div className="grid md:grid-cols-2 gap-6 md:gap-8 relative">
							<div className="absolute -top-10 -right-10 hidden md:block animate-bounce">
								<Star className="w-16 h-16 text-yellow-400 fill-current drop-shadow-[4px_4px_0px_rgba(0,0,0,1)]" />
							</div>
							<div className="absolute -bottom-10 -left-10 hidden md:block animate-pulse">
								<Sparkles className="w-16 h-16 text-pink-400 fill-current drop-shadow-[4px_4px_0px_rgba(0,0,0,1)]" />
							</div>

							<div
								className={`border-4 border-black bg-white shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] md:shadow-[12px_12px_0px_0px_rgba(0,0,0,1)] p-5 md:p-6 relative overflow-hidden group hover:shadow-[12px_12px_0px_0px_rgba(0,0,0,1)] md:hover:shadow-[16px_16px_0px_0px_rgba(0,0,0,1)] transition-all duration-300`}
							>
								<div
									className={`absolute top-0 right-0 p-2 border-l-2 border-b-2 border-black font-bold text-[10px] md:text-xs ${personalityTypes[dominantType].color}`}
								>
									DOMINANT TRAIT
								</div>

								<div className="mt-4 md:mt-6 text-center">
									<div className="relative inline-block">
										<div className="absolute inset-0 bg-black rounded-full opacity-20 blur-xl animate-pulse"></div>
										{React.createElement(personalityTypes[dominantType].icon, {
											className: `w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 mx-auto mb-4 ${personalityTypes[dominantType].textColor} drop-shadow-[4px_4px_0px_rgba(0,0,0,1)] relative z-10 animate-bounce`,
										})}
									</div>

									<h2 className="text-2xl sm:text-3xl md:text-4xl font-black uppercase mb-1">
										{personalityTypes[dominantType].name}
									</h2>
									<div
										className={`inline-block px-3 py-1 text-[10px] sm:text-xs md:text-sm font-bold bg-black text-white -rotate-2 mb-4 hover:rotate-0 transition-transform`}
									>
										{personalityTypes[dominantType].alias}
									</div>

									<p className="text-sm sm:text-base md:text-lg font-bold leading-relaxed mb-6 border-y-2 border-black py-4 bg-gray-50">
										{personalityTypes[dominantType].desc}
									</p>

									<div className="text-left">
										<h4 className="font-black text-[10px] sm:text-xs md:text-sm uppercase bg-[#ccff00] inline-block px-1 border border-black mb-2">
											🔥 Superpowers:
										</h4>
										<div className="flex flex-wrap gap-2 mb-4">
											{personalityTypes[dominantType].traits.map((t, i) => (
												<span
													key={t}
													className="border border-black px-2 py-0.5 text-[10px] sm:text-xs md:text-sm font-semibold shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] bg-white hover:-translate-y-1 transition-transform"
												>
													{t}
												</span>
											))}
										</div>

										<h4 className="font-black text-[10px] sm:text-xs md:text-sm uppercase bg-[#ff00ff] text-white inline-block px-1 border border-black mb-2">
											💀 Red Flag:
										</h4>
										<p className="text-[10px] sm:text-xs md:text-sm font-medium leading-normal">
											{personalityTypes[dominantType].weakness}
										</p>
									</div>
								</div>
							</div>

							<div className="flex flex-col gap-5 md:gap-6">
								<div className="border-4 border-black bg-white p-4 sm:p-5 md:p-6 shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] md:shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
									<h3 className="font-black text-lg md:text-xl mb-4 italic">
										STATS BREAKDOWN
									</h3>
									<div className="space-y-3 md:space-y-4">
										{Object.entries(scores).map(([key, score], idx) => {
											const maxPossible = questionsData.length;
											const percentage = Math.min(
												(score / maxPossible) * 100,
												100
											);
											const type = personalityTypes[key];

											return (
												<div key={key} className="flex items-center gap-3">
													<div className="w-6 md:w-8 font-black text-lg md:text-xl">
														{key}
													</div>
													<div className="flex-1 h-6 md:h-8 border-2 border-black bg-gray-100 relative overflow-hidden">
														<div
															className={`h-full ${type.color} border-r-2 border-black transition-all duration-1000 ease-out`}
															style={{
																width: `${Math.max(percentage, 5)}%`,
															}}
														></div>
													</div>
													<div className="w-6 md:w-8 font-bold text-right text-sm md:text-base">
														{score}
													</div>
												</div>
											);
										})}
									</div>
								</div>

								<div className="grid grid-cols-2 gap-3 md:gap-4">
									<Button
										onClick={() => window.location.reload()}
										variant="secondary"
										className="flex items-center justify-center gap-2 text-xs md:text-base"
									>
										<RefreshCcw className="w-3 h-3 md:w-4 md:h-4" /> RETEST
									</Button>
									<Button
										onClick={handleShare}
										variant="primary"
										className="flex items-center justify-center gap-2 text-xs md:text-base"
									>
										SHARE <Share2 className="w-3 h-3 md:w-4 md:h-4" />
									</Button>
								</div>

								<div className="border-2 border-black p-3 md:p-4 bg-yellow-100 text-[10px] md:text-xs font-bold text-center">
									Note: Ini adalah simplified version dari DISC assessment untuk
									tujuan hiburan & demo.
								</div>
							</div>
						</div>
					</div>
				)}
			</main>

			<footer className="bg-black text-white py-4 md:py-6 mt-6 md:mt-12 overflow-hidden">
				<div className="whitespace-nowrap animate-[marquee_20s_linear_infinite] font-mono text-xs md:text-sm opacity-50">
					DISC ASSESSMENT /// GEN Z EDITION /// FIND YOUR TRUE SELF /// NO DRAMA
					/// JUST VIBES /// DISC ASSESSMENT /// GEN Z EDITION
				</div>
			</footer>

			<style>{`
        @keyframes marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
      `}</style>
		</div>
	);
}
