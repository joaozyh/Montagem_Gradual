(() => {
  // Biblioteca curada com os prompts definidos pelo usuário.
  const prompts = [
    // Ensaios femininos
    {
      title: "Estúdio / Editorial",
      category: "Imagem",
      description: "Ensaio editorial de estúdio com visual sofisticado e composição limpa.",
      imageLabel: "Studio Editorial",
      colors: ["#4f5f7d", "#aeb7c8"],
      prompt: "Create an image of a full-body vertical studio editorial portrait of a woman wearing a sophisticated fitted evening outfit in a modern fashion style, posed confidently in a clean studio set with a seamless neutral backdrop, minimal set design, and a sculptural pedestal or cube element beside her, styled with a polished high-fashion aesthetic, elegant posture, refined visual balance, clean composition, soft diffused studio lighting, subtle shadows, and a polished editorial photoshoot look."
    },
    {
      title: "Floreça / Floral",
      category: "Imagem",
      description: "Ensaio floral romântico com atmosfera delicada e feminina.",
      imageLabel: "Floral",
      colors: ["#8f5f80", "#e4b9c8"],
      prompt: "Create an image of a vertical studio birthday portrait of a woman wearing a romantic floral-inspired gown in soft pastel tones, surrounded by abundant fresh flowers and delicate floral arrangements, with blossoms placed around the floor and framing the background, creating a blooming garden-inspired studio scene, elegant feminine styling, soft organic textures, dreamy and delicate atmosphere, clean editorial composition, soft diffused lighting, and a polished fashion photoshoot look."
    },
    {
      title: "Black & Gold / Glamour",
      category: "Imagem",
      description: "Ensaio glamouroso com contraste intenso e luxo em preto e dourado.",
      imageLabel: "Black Gold",
      colors: ["#2d2a31", "#d0a646"],
      prompt: "Create an image of a full-body vertical studio birthday portrait of a woman wearing a glamorous black fitted evening gown with elegant gold details, posed against a luxurious dark studio backdrop with black and metallic gold balloons, golden decorative accents, and a refined party setup, styled with an upscale glamorous aesthetic, dramatic yet elegant visual impact, sophisticated composition, soft controlled studio lighting, rich contrast, and a polished editorial fashion photoshoot look."
    },
    {
      title: "Deusa / Mística",
      category: "Imagem",
      description: "Ensaio etéreo com estética divina e elementos místicos.",
      imageLabel: "Mystic",
      colors: ["#4b506f", "#b0a0d7"],
      prompt: "Create an image of a vertical studio portrait of a woman wearing a flowing ethereal gown inspired by a mystical goddess aesthetic, with draped fabric, elegant movement, and celestial styling, posed within a dreamy set featuring soft fabric elements, candles, subtle golden accents, moon-inspired decor, and mystical ornamental details, creating a divine and enchanting atmosphere, elegant and powerful styling, soft cinematic composition, gentle glowing studio lighting, and a polished editorial fantasy photoshoot look."
    },
    {
      title: "Retrô (anos 90)",
      category: "Imagem",
      description: "Ensaio colorido com referências nostálgicas e energia dos anos 90.",
      imageLabel: "Retro 90s",
      colors: ["#2d6e8a", "#f57c8a"],
      prompt: "Create an image of a vertical studio birthday portrait of a woman wearing a stylish 1990s-inspired fashion outfit, featuring a fitted mini dress or coordinated set with playful retro styling, posed in a colorful studio scene with nostalgic 90s elements such as metallic balloons, CDs, a retro phone, a boombox, and bold decorative shapes, with a fun youthful party atmosphere, vibrant visual energy, clean editorial composition, soft studio lighting, and a polished retro fashion photoshoot look."
    },
    {
      title: "Chá das Trinta",
      category: "Imagem",
      description: "Ensaio de aniversário refinado em cenário de chá da tarde.",
      imageLabel: "Tea Party 30",
      colors: ["#7e624f", "#d8bda3"],
      prompt: "Create an image of a vertical studio birthday portrait of a woman seated elegantly in a refined tea party setting celebrating her thirtieth birthday, wearing a sophisticated feminine dress in soft romantic tones, surrounded by an elegant table setup with porcelain tea cups, a decorated cake, flowers, pastries, and tasteful \"30\" decor elements, creating a chic and celebratory afternoon tea atmosphere, delicate styling, clean editorial composition, soft diffused studio lighting, and a polished fashion photoshoot look."
    },
    {
      title: "Noir Prata / Festa Elegante",
      category: "Imagem",
      description: "Tema: glamour noturno preto e prata com estética editorial de festa.",
      imageLabel: "Noir Silver",
      colors: ["#2b2f39", "#a8afbc"],
      prompt: "Create an image of a full-body studio fashion portrait of a woman wearing a sleek black floor-length evening dress with an asymmetrical off-shoulder neckline, fitted long sleeves, a waist cutout, and a dramatic high thigh slit, paired with nude platform ankle-strap heels, standing on a dark seamless studio backdrop beside a tall arrangement of metallic silver and black balloons with additional balloons scattered across the floor, elegant party photoshoot styling, clean vertical composition, soft diffused studio lighting, polished editorial look."
    },
    {
      title: "Spotlight 20 / Prata Editorial",
      category: "Imagem",
      description: "Tema: aniversário de 20 anos com cubo preto e luz circular de estúdio.",
      imageLabel: "Spotlight 20",
      colors: ["#353942", "#c0c6d4"],
      prompt: "Create an image of a vertical studio birthday portrait of a woman seated sideways on a black cube pedestal, wearing a fitted black off-shoulder long-sleeve mini dress with knee-high black lace-up boots, holding a small birthday cake with both hands at chest height, set against a dark studio background with a large circular white spotlight backdrop behind her, oversized metallic silver number balloons forming \"20\" positioned above and behind her, and several loose silver balloons scattered on the floor, elegant party styling, clean editorial composition, soft controlled studio lighting, polished fashion photoshoot look."
    },
    {
      title: "Red Romance / Balões Vermelhos",
      category: "Imagem",
      description: "Tema: ensaio monocromático vermelho com clima romântico de aniversário.",
      imageLabel: "Red Romance",
      colors: ["#8f1f2e", "#e15766"],
      prompt: "Create an image of a vertical studio birthday portrait of a woman seated among clusters of glossy red balloons, wearing a strapless or off-shoulder red satin gown with a fitted bodice and voluminous skirt, holding a white round cake decorated with small red hearts in one hand while the other hand lightly touches her hair, set against a clean light studio backdrop with soft shadows, floating red helium balloons behind her and additional red balloons scattered around the floor, monochromatic red party styling, elegant editorial composition, soft diffused studio lighting, polished fashion photoshoot look."
    },
    // Poses de personagem
    {
      title: "Pose Perfil com Braço Elevado",
      category: "Personagem",
      description: "Pose lateral elegante com um braço elevado sobre a cabeça.",
      imageLabel: "Pose Perfil",
      colors: ["#385b8f", "#90b8df"],
      prompt: "Create an image of a character in a clean side-profile pose, standing with the body in near full profile, one arm raised overhead with the hand resting on the crown of the head, elbow bent and framing the head, the other arm relaxed downward, chin slightly lifted, neck elongated, shoulders relaxed, torso subtly extended with a gentle natural arch. Camera positioned side-on at eye level, medium-full portrait framing, vertical composition, subject slightly off-center, natural portrait-lens perspective."
    },
    {
      title: "Pose Frontal com Mãos Elevadas ao Peito",
      category: "Personagem",
      description: "Composição frontal com as mãos próximas ao rosto e expressão suave.",
      imageLabel: "Pose Frontal",
      colors: ["#7a4a4a", "#d39b8c"],
      prompt: "Create an image of a character in a front-facing pose, upper body squared toward the camera, both elbows bent inward, both hands raised together at chest height close to the lower face, shoulders relaxed, head slightly tilted, chin subtly lowered. Camera positioned frontal at eye level, medium close-up portrait framing, vertical composition, centered subject, natural portrait-lens perspective."
    },
    {
      title: "Pose Contemplativa com Mãos no Rosto",
      category: "Personagem",
      description: "Pose calma e contemplativa com enquadramento intimista.",
      imageLabel: "Pose Contemplativa",
      colors: ["#5b5d8a", "#9ea1ca"],
      prompt: "Create an image of a character in a calm portrait pose, upper body facing mostly forward with a slight three-quarter turn, head gently turned off-camera, gaze directed to the side, both hands softly raised to frame the face and neck, one hand resting near the cheek and the other near the jawline, elbows relaxed downward, shoulders loose, chin neutral. Camera positioned at eye level from a frontal-to-slight three-quarter angle, medium close-up portrait framing, vertical composition, subject centered in the lower-middle of the frame with generous headroom, natural portrait-lens perspective."
    },
    {
      title: "Pose Sentada com Joelho em Primeiro Plano",
      category: "Personagem",
      description: "Pose sentada dinâmica com perspectiva forte de profundidade.",
      imageLabel: "Pose Sentada",
      colors: ["#51684a", "#9fc593"],
      prompt: "Create an image of a character in a seated pose with one knee raised toward the camera and the other leg folded inward, torso leaning slightly forward, one elbow resting on the raised knee, that hand placed on the top of the head, the opposite arm relaxed downward with the hand resting beside the body, head slightly tilted. Camera positioned at a low eye-level frontal three-quarter angle, medium-full portrait framing, centered composition, strong foreground-leg perspective, natural portrait-lens perspective."
    },
    {
      title: "Pose Três-Quartos com Mão na Cintura",
      category: "Personagem",
      description: "Postura em pé com atitude e rotação suave de ombros.",
      imageLabel: "Pose 3/4",
      colors: ["#7f5d42", "#d6a97f"],
      prompt: "Create an image of a character in a standing three-quarter pose, body angled slightly away from the camera, one hand resting on the waist, the opposite arm relaxed along the body, shoulders subtly rotated, head turned back toward the camera, chin neutral, posture upright with a natural body curve. Camera positioned at eye level from a frontal three-quarter angle, medium-full portrait framing, vertical composition, subject centered, natural portrait-lens perspective."
    },
    {
      title: "Pose Caminhada com Passo à Frente",
      category: "Personagem",
      description: "Pose de movimento com passo à frente e sensação de avanço.",
      imageLabel: "Pose Caminhada",
      colors: ["#355f6d", "#6cb9c9"],
      prompt: "Create an image of a character in a walking pose, one leg stepping forward, the rear leg slightly extended behind, torso upright, arms naturally alternating with the movement, shoulders relaxed, head facing forward, body aligned in a dynamic forward motion. Camera positioned frontal at a slightly low angle, medium-full portrait framing, vertical composition, centered subject, subtle perspective compression, natural portrait-lens perspective."
    },
    {
      title: "Pose Sobre o Ombro",
      category: "Personagem",
      description: "Enquadramento por trás com giro de cabeça sobre o ombro.",
      imageLabel: "Over Shoulder",
      colors: ["#4f556e", "#9ca4c8"],
      prompt: "Create an image of a character in an over-the-shoulder pose, body turned mostly away from the camera, torso angled backward, head rotated over one shoulder toward the lens, one arm relaxed along the body, the other arm slightly bent, shoulders softly twisted, posture upright. Camera positioned behind the subject at eye level, rear three-quarter angle, medium portrait framing, vertical composition, subject slightly off-center, natural portrait-lens perspective."
    },
    {
      title: "Pose Agachada com Corpo Inclinado",
      category: "Personagem",
      description: "Pose baixa com energia e perspectiva frontal marcante.",
      imageLabel: "Pose Agachada",
      colors: ["#6a4f62", "#b38fb0"],
      prompt: "Create an image of a character in a low crouching pose, both knees bent, body lowered close to the ground, torso leaning slightly forward, one arm resting over one knee, the opposite arm relaxed near the body, head angled toward the camera, shoulders naturally compressed by the pose. Camera positioned frontal at a low angle, medium-full portrait framing, vertical composition, centered subject, strong low-perspective framing, natural portrait-lens perspective."
    },
    {
      title: "Pose Sentada Lateral com Torso Torcido",
      category: "Personagem",
      description: "Pose sentada lateral com torção elegante em direção à câmera.",
      imageLabel: "Sentada Lateral",
      colors: ["#6b6c49", "#b9bd86"],
      prompt: "Create an image of a character in a seated side pose, body positioned sideways to the camera, both legs folded naturally to one side, torso twisted gently toward the lens, one hand placed beside the body for support, the other arm relaxed across the lap, head turned toward the camera, posture elegant and controlled. Camera positioned at eye level from a side three-quarter angle, medium-full portrait framing, vertical composition, subject centered, natural portrait-lens perspective."
    },
    {
      title: "Pose em Pé com Braços Cruzados",
      category: "Personagem",
      description: "Postura firme e equilibrada com braços cruzados naturalmente.",
      imageLabel: "Bracos Cruzados",
      colors: ["#44566f", "#8ea5be"],
      prompt: "Create an image of a character in a standing pose with both arms crossed naturally over the torso, shoulders relaxed, body facing forward with a slight three-quarter rotation, head aligned toward the camera, chin neutral, posture upright and balanced, weight subtly shifted onto one leg. Camera positioned frontal at eye level, medium portrait framing, vertical composition, centered subject, natural portrait-lens perspective."
    },
    {
      title: "Pose Frontal com Objeto Próximo ao Rosto",
      category: "Personagem",
      description: "Close-up frontal com objeto próximo ao rosto e expressão lúdica.",
      imageLabel: "Objeto Rosto",
      colors: ["#6d4e5c", "#c89aac"],
      prompt: "Create an image of a character in a close-up portrait pose, facing the camera, holding a small round object close to the face with both hands, elbows bent inward, shoulders relaxed, head slightly tilted, smiling expression, upper body subtly angled for a playful portrait posture. Camera positioned frontal at eye level, close-up portrait framing, vertical composition, centered subject, natural portrait-lens perspective."
    },
    {
      title: "Pose Três-Quartos de Costas com Olhar Sobre o Ombro",
      category: "Personagem",
      description: "Pose fashion de corpo inteiro com rotação elegante e olhar por cima do ombro.",
      imageLabel: "3/4 Costas",
      colors: ["#4e5f7b", "#9eb2d1"],
      prompt: "Create an image of a character in an elegant full-body fashion pose, standing in a three-quarter back view with the body angled away from the camera, torso slightly twisted, one hand resting near the hip, the other arm softly bent and relaxed, weight supported on one leg with the other leg extended lightly behind, head turned back over the shoulder toward the camera, graceful posture. Camera positioned at eye level from a rear three-quarter angle, full-body framing, vertical composition, subject centered, natural portrait-lens perspective."
    },
    {
      title: "Pose Três-Quartos com Mão na Cintura (Corpo Inteiro)",
      category: "Personagem",
      description: "Variação de corpo inteiro com postura confiante e linha alongada.",
      imageLabel: "3/4 Full Body",
      colors: ["#6b5a42", "#c8ab85"],
      prompt: "Create an image of a character in a full-body three-quarter pose, body slightly angled, weight on the back leg, front leg relaxed and lightly crossed forward, one hand resting on the waist with the elbow bent outward, the other hand gently placed near the thigh, shoulders relaxed, torso elongated, chin slightly lifted, head turned slightly off-camera, confident natural posture. Camera positioned at eye level, full-body framing, vertical composition, subject centered, natural portrait-lens perspective."
    },
    // Camera e composicao
    {
      title: "Camera 01 / Full-body eye-level portrait",
      category: "Camera",
      description: "Corpo inteiro com camera frontal no nivel dos olhos.",
      imageLabel: "Camera 01",
      colors: ["#3b5f8a", "#88b5df"],
      prompt: "Full-body portrait framing, eye-level camera position, camera placed directly in front of the subject, balanced vertical composition, natural standing perspective, realistic 50mm lens look, minimal perspective distortion, full body visible from head to feet, clean subject separation, softly blurred background, professional portrait photography, sharp focus on the subject."
    },
    {
      title: "Camera 02 / Full-body low-angle fashion shot",
      category: "Camera",
      description: "Corpo inteiro com angulo baixo e impacto fashion.",
      imageLabel: "Camera 02",
      colors: ["#41506b", "#98a9c7"],
      prompt: "Full-body fashion photography framing, low-angle camera position slightly below the subject's waist level, camera tilted subtly upward, subject appearing taller and more powerful, 35mm editorial lens perspective, slight foreground depth, strong vertical composition, natural perspective compression, sharp subject focus, soft background blur, professional fashion shoot look."
    },
    {
      title: "Camera 03 / Full-body high-angle soft portrait",
      category: "Camera",
      description: "Corpo inteiro com leve plongée e visual suave.",
      imageLabel: "Camera 03",
      colors: ["#566f87", "#acc8df"],
      prompt: "Full-body portrait framing from a slightly high camera angle, camera positioned above eye level looking gently downward, elegant flattering perspective, 50mm lens feel, clean vertical composition, soft subject separation, shallow depth of field, natural body proportions, professional studio portrait style, sharp focus on the face and body."
    },
    {
      title: "Camera 04 / Three-quarter body portrait",
      category: "Camera",
      description: "Enquadramento tres quartos da cabeca ate joelhos.",
      imageLabel: "Camera 04",
      colors: ["#6e5a7a", "#c2a6cf"],
      prompt: "Three-quarter body portrait framing, subject visible from head to mid-thigh or knees, camera at chest height, slightly angled perspective, 50mm portrait lens look, natural compression, soft shallow depth of field, background smoothly blurred, subject centered with clean negative space, professional editorial portrait composition."
    },
    {
      title: "Camera 05 / Medium portrait waist-up",
      category: "Camera",
      description: "Retrato medio da cintura para cima com foco no rosto.",
      imageLabel: "Camera 05",
      colors: ["#6a4f4f", "#c79a9a"],
      prompt: "Medium portrait framing from the waist up, eye-level camera angle, natural 50mm lens perspective, balanced headroom, clean shoulder framing, soft background blur, shallow depth of field, realistic portrait compression, sharp focus on the eyes and face, professional studio portrait photography."
    },
    {
      title: "Camera 06 / Close-up beauty portrait",
      category: "Camera",
      description: "Close-up de beleza com bokeh cremoso e foco nos olhos.",
      imageLabel: "Camera 06",
      colors: ["#5b6b8e", "#a8b8dd"],
      prompt: "Close-up beauty portrait framing, camera positioned at eye level, face filling most of the frame, 85mm portrait lens look, strong background compression, very shallow depth of field, creamy bokeh, sharp focus on the eyes, soft facial perspective, professional beauty photography style, clean and polished composition."
    },
    {
      title: "Camera 07 / Extreme close-up face portrait",
      category: "Camera",
      description: "Close extremo com corte fechado e atmosfera cinematica.",
      imageLabel: "Camera 07",
      colors: ["#575f70", "#a7b0c2"],
      prompt: "Extreme close-up portrait framing, tight crop around the face, camera at eye level, 85mm to 100mm portrait lens feel, very shallow depth of field, strong focus on the eyes, soft falloff around the edges, creamy background blur, intimate cinematic portrait composition, realistic facial proportions."
    },
    {
      title: "Camera 08 / Profile side portrait",
      category: "Camera",
      description: "Retrato lateral de perfil com espaco negativo elegante.",
      imageLabel: "Camera 08",
      colors: ["#4f6770", "#9dc3cf"],
      prompt: "Side profile portrait framing, camera positioned directly to the side of the subject, clean lateral perspective, 85mm portrait lens look, compressed background, shallow depth of field, subject sharply separated from the background, elegant negative space in front of the face, professional editorial portrait style."
    },
    {
      title: "Camera 09 / Three-quarter face angle",
      category: "Camera",
      description: "Rosto em tres quartos com perspectiva valorizada.",
      imageLabel: "Camera 09",
      colors: ["#6f6451", "#ccb590"],
      prompt: "Three-quarter face portrait angle, camera positioned slightly to one side of the subject, face turned partially toward the lens, 50mm to 85mm portrait lens feel, flattering facial perspective, shallow depth of field, soft background blur, sharp focus on the eyes, professional portrait composition."
    },
    {
      title: "Camera 10 / Over-the-shoulder portrait",
      category: "Camera",
      description: "Composicao por cima do ombro com foco cinematico.",
      imageLabel: "Camera 10",
      colors: ["#515173", "#a7a9da"],
      prompt: "Over-the-shoulder portrait composition, camera positioned behind and slightly to the side of the subject, subject looking back toward the lens, 85mm portrait lens look, strong background compression, shallow depth of field, cinematic focus on the face, elegant editorial framing, soft blurred background."
    },
    {
      title: "Camera 11 / Seated portrait eye-level",
      category: "Camera",
      description: "Retrato sentado com camera na altura dos olhos.",
      imageLabel: "Camera 11",
      colors: ["#4b6f66", "#98cdc0"],
      prompt: "Seated portrait framing, camera positioned at the subject's eye level while seated, natural perspective, 50mm lens look, balanced vertical composition, subject centered with clean framing, soft shallow depth of field, sharp focus on the face, professional portrait photography style."
    },
    {
      title: "Camera 12 / Seated low-angle portrait",
      category: "Camera",
      description: "Retrato sentado com angulo baixo e leitura editorial.",
      imageLabel: "Camera 12",
      colors: ["#735347", "#c79f8d"],
      prompt: "Seated portrait with a low camera angle, camera positioned slightly below the subject's torso level and tilted gently upward, 35mm editorial lens perspective, subtle dramatic perspective, full seated posture visible, clean subject separation, shallow depth of field, professional fashion portrait look."
    },
    {
      title: "Camera 13 / Floor-level cinematic shot",
      category: "Camera",
      description: "Perspectiva rente ao chao com escala dramatica.",
      imageLabel: "Camera 13",
      colors: ["#3f4f5f", "#8ea2b6"],
      prompt: "Floor-level camera perspective, camera positioned very low near the ground, looking slightly upward toward the subject, wide 35mm lens feel, cinematic foreground depth, strong sense of scale, subject dominant in frame, soft background blur, dramatic editorial composition, professional photography style."
    },
    {
      title: "Camera 14 / Top-down portrait",
      category: "Camera",
      description: "Retrato zenital com enquadramento limpo de cima para baixo.",
      imageLabel: "Camera 14",
      colors: ["#5d6a4c", "#b7ca9a"],
      prompt: "Top-down portrait perspective, camera positioned directly above the subject looking downward, clean overhead composition, 35mm to 50mm lens look, minimal distortion, subject arranged clearly within the frame, balanced spacing around the body, soft even focus, professional overhead portrait photography."
    },
    {
      title: "Camera 15 / Slight top-down close portrait",
      category: "Camera",
      description: "Close levemente superior para retrato favorecedor.",
      imageLabel: "Camera 15",
      colors: ["#6a5f86", "#bfb3dd"],
      prompt: "Close portrait from a slightly top-down camera angle, camera positioned above the subject's eye line looking gently downward, 50mm portrait lens feel, flattering facial perspective, shallow depth of field, soft background blur, sharp focus on the eyes and face, clean editorial framing."
    },
    {
      title: "Camera 16 / Wide editorial environmental framing",
      category: "Camera",
      description: "Enquadramento aberto com contexto ambiental editorial.",
      imageLabel: "Camera 16",
      colors: ["#4b6b7c", "#98c4d8"],
      prompt: "Wide editorial portrait framing, camera positioned at eye level, subject smaller within the frame with visible surrounding space, 35mm lens perspective, balanced composition, natural depth, subtle background blur, professional lifestyle photography style, clean visual hierarchy with the subject as the focal point."
    },
    {
      title: "Camera 17 / Compressed telephoto portrait",
      category: "Camera",
      description: "Retrato teleobjetiva com compressao forte de fundo.",
      imageLabel: "Camera 17",
      colors: ["#55626f", "#a8b6c4"],
      prompt: "Telephoto portrait composition, 85mm to 135mm lens look, strong background compression, shallow depth of field, creamy bokeh, subject sharply separated from the background, minimal perspective distortion, professional high-end portrait photography, clean and elegant framing."
    },
    {
      title: "Camera 18 / Natural smartphone-style portrait",
      category: "Camera",
      description: "Retrato natural estilo smartphone com acabamento polido.",
      imageLabel: "Camera 18",
      colors: ["#60715a", "#b8ccb0"],
      prompt: "Natural smartphone-style portrait framing, camera positioned slightly above eye level, close-to-medium distance, subtle wide-angle perspective, realistic handheld composition, natural facial perspective, soft background blur, sharp subject focus, casual but polished vertical portrait photography."
    },
    {
      title: "Camera 19 / Editorial tilted camera angle",
      category: "Camera",
      description: "Angulo holandes sutil para energia visual moderna.",
      imageLabel: "Camera 19",
      colors: ["#6f5a5a", "#c9a5a5"],
      prompt: "Editorial portrait with a subtle Dutch angle, camera slightly tilted for a dynamic fashion composition, medium-to-full body framing, 35mm to 50mm lens look, controlled perspective, sharp subject focus, shallow depth of field, modern editorial photography style, cinematic visual energy."
    },
    {
      title: "Camera 20 / Centered symmetrical portrait",
      category: "Camera",
      description: "Composicao central simetrica com equilibrio visual.",
      imageLabel: "Camera 20",
      colors: ["#4a5d6f", "#9fb8cf"],
      prompt: "Centered symmetrical portrait composition, camera positioned directly in front of the subject at eye level, balanced vertical framing, equal negative space on both sides, 50mm lens perspective, natural compression, shallow depth of field, clean professional portrait photography, sharp focus on the subject."
    },
    {
      title: "Camera 21 / Off-center rule-of-thirds portrait",
      category: "Camera",
      description: "Regra dos tercos com sujeito deslocado e respiro.",
      imageLabel: "Camera 21",
      colors: ["#5f6a50", "#b8c79a"],
      prompt: "Rule-of-thirds portrait composition, subject positioned slightly off-center, camera at eye level, medium-to-full body framing, 50mm lens look, balanced negative space, soft shallow depth of field, clean background separation, professional editorial portrait style."
    },
    {
      title: "Camera 22 / Close-up with foreground blur",
      category: "Camera",
      description: "Close-up com desfoque em primeiro plano para profundidade.",
      imageLabel: "Camera 22",
      colors: ["#635777", "#b6a9d8"],
      prompt: "Close-up portrait composition with soft foreground blur, camera positioned at eye level, 85mm portrait lens look, shallow depth of field, blurred foreground elements partially framing the subject, sharp focus on the eyes, creamy bokeh, cinematic professional portrait photography."
    },
    {
      title: "Camera 23 / Full-body with background compression",
      category: "Camera",
      description: "Corpo inteiro com tele e fundo comprimido.",
      imageLabel: "Camera 23",
      colors: ["#5f5f5f", "#b8b8b8"],
      prompt: "Full-body portrait with strong background compression, camera placed farther from the subject, 85mm to 135mm telephoto lens look, full body visible, minimal perspective distortion, soft compressed background blur, subject sharply separated, high-end professional portrait photography."
    },
    {
      title: "Camera 24 / Dynamic walking-style camera angle",
      category: "Camera",
      description: "Angulo dinamico de caminhada para moda em movimento.",
      imageLabel: "Camera 24",
      colors: ["#4d6f7b", "#9dc9d7"],
      prompt: "Dynamic full-body portrait framing, camera positioned slightly low and in front of the subject, 35mm lens perspective, subtle sense of movement, natural editorial composition, subject framed from head to feet, shallow depth of field, sharp focus on the subject, professional fashion photography style."
    },
    {
      title: "Camera 25 / Baby child low eye-level camera",
      category: "Camera",
      description: "Infantil no nivel do olhar da crianca para proporcao natural.",
      imageLabel: "Camera 25",
      colors: ["#6b7b58", "#c8d8b1"],
      prompt: "Low eye-level portrait photography for a baby or child, camera positioned at the child's face height, close-to-medium distance, 50mm portrait lens feel, natural proportions, soft shallow depth of field, creamy background blur, sharp focus on the eyes, professional children's portrait photography."
    },
    {
      title: "Camera 26 / Baby child top-down soft portrait",
      category: "Camera",
      description: "Infantil com vista superior suave e composicao equilibrada.",
      imageLabel: "Camera 26",
      colors: ["#7a6a84", "#d3c2dc"],
      prompt: "Soft top-down portrait for a baby or child, camera positioned above the subject looking downward, gentle overhead perspective, 35mm to 50mm lens look, balanced framing around the body, soft focus falloff, clean composition, natural proportions, professional baby photography style."
    },
    {
      title: "Camera 27 / Baby child close-up portrait",
      category: "Camera",
      description: "Close-up infantil com bokeh cremoso e foco nos olhos.",
      imageLabel: "Camera 27",
      colors: ["#6f5d4b", "#ccb59b"],
      prompt: "Close-up baby or child portrait framing, camera at face level, 85mm portrait lens look, shallow depth of field, soft creamy bokeh, sharp focus on the eyes, natural facial proportions, gentle perspective, clean professional children's photography composition."
    },
    {
      title: "Camera 28 / Baby child full-body seated framing",
      category: "Camera",
      description: "Corpo inteiro infantil sentado com separacao limpa.",
      imageLabel: "Camera 28",
      colors: ["#516c73", "#9fc9d1"],
      prompt: "Full-body seated portrait for a baby or child, camera positioned at low eye level, subject fully visible within the frame, 50mm lens perspective, natural proportions, soft background blur, shallow depth of field, clean subject separation, professional studio baby photography style."
    },
    // Formaturas
    {
      title: "Formatura Infantil - Feminino",
      category: "Imagem",
      description: "Tema: formatura infantil feminina com atmosfera escolar brasileira festiva.",
      imageLabel: "Formatura Feminino",
      colors: ["#7d6ab2", "#d8c9f7"],
      prompt: "Create an image of a vertical studio graduation portrait of a young girl in a Brazilian school graduation theme, wearing a traditional graduation cap and gown styled for early childhood graduation, paired with a light festive dress and formal shoes, holding a diploma tied with a ribbon, set in a cheerful studio scene with pastel balloons, books, pencils, school-themed props, floral accents, and decorative letters or numbers, with a playful and celebratory Brazilian graduation atmosphere, clean composition, soft diffused studio lighting, and a polished professional graduation photoshoot look."
    },
    {
      title: "Formatura Infantil - Masculino",
      category: "Imagem",
      description: "Tema: formatura infantil masculina com cena escolar alegre e comemorativa.",
      imageLabel: "Formatura Masculino",
      colors: ["#4e79a7", "#b7d3f0"],
      prompt: "Create an image of a vertical studio graduation portrait of a young boy in a Brazilian school graduation theme, wearing a traditional graduation cap and gown styled for early childhood graduation, paired with a formal outfit and dress shoes, holding a diploma tied with a ribbon, set in a cheerful studio scene with balloons, books, pencils, school-themed props, decorative letters or numbers, and playful celebratory elements, creating a joyful Brazilian graduation atmosphere, clean composition, soft diffused studio lighting, and a polished professional graduation photoshoot look."
    },
    {
      title: "Formatura Adolescente - Feminino",
      category: "Imagem",
      description: "Tema: formatura escolar adolescente feminina com visual moderno e editorial.",
      imageLabel: "Formatura Teen F",
      colors: ["#8b5f8f", "#d7b7da"],
      prompt: "Create an image of a vertical studio graduation portrait of a teenage girl in a Brazilian school graduation theme, wearing a traditional graduation cap and gown over an elegant outfit or dress, holding a diploma in one hand, posed in a refined studio set with balloons, floral details, school-themed decor, books, and subtle celebratory props, with a modern and polished Brazilian graduation aesthetic, elegant composition, soft controlled studio lighting, and a professional editorial graduation photoshoot look."
    },
    {
      title: "Formatura Adolescente - Masculino",
      category: "Imagem",
      description: "Tema: formatura escolar adolescente masculina com acabamento sofisticado.",
      imageLabel: "Formatura Teen M",
      colors: ["#4d617f", "#b4c2d9"],
      prompt: "Create an image of a vertical studio graduation portrait of a teenage boy in a Brazilian school graduation theme, wearing a traditional graduation cap and gown over a formal outfit with shirt, trousers, and dress shoes, holding a diploma, posed in a clean studio set with balloons, books, school-themed props, and subtle celebratory decor, creating a modern and polished Brazilian graduation atmosphere, clean composition, soft controlled studio lighting, and a professional editorial graduation photoshoot look."
    },
    {
      title: "Formatura Adulto - Feminino",
      category: "Imagem",
      description: "Tema: formatura adulta feminina com direção elegante e acadêmica.",
      imageLabel: "Formatura Adult F",
      colors: ["#7f5b6f", "#d3b7c8"],
      prompt: "Create an image of a vertical studio graduation portrait of an adult woman in a Brazilian graduation theme, wearing a traditional graduation cap and gown over an elegant formal dress and heels, holding a diploma with one hand and posing confidently in a sophisticated studio set with balloons, floral arrangements, celebratory decor, and academic-themed props, creating a refined and elegant Brazilian graduation atmosphere, clean editorial composition, soft diffused studio lighting, and a polished professional graduation photoshoot look."
    },
    {
      title: "Formatura Adulto - Masculino",
      category: "Imagem",
      description: "Tema: formatura adulta masculina com estética profissional refinada.",
      imageLabel: "Formatura Adult M",
      colors: ["#5a6472", "#bdc6d1"],
      prompt: "Create an image of a vertical studio graduation portrait of an adult man in a Brazilian graduation theme, wearing a traditional graduation cap and gown over a formal suit or dress shirt and trousers with polished shoes, holding a diploma and posing confidently in a refined studio set with balloons, celebratory decor, and academic-themed props, creating a sophisticated and polished Brazilian graduation atmosphere, clean editorial composition, soft controlled studio lighting, and a polished professional graduation photoshoot look."
    },
    // Ensaios infantis - feminino
    {
      title: "Infantil Feminino / Jardim Encantado",
      category: "Imagem",
      description: "Tema: ensaio infantil feminino com jardim mágico e atmosfera de conto de fadas.",
      imageLabel: "Jardim Feminino",
      colors: ["#6f8f5a", "#d5e6b8"],
      prompt: "Create an image of a vertical studio baby portrait of a baby girl dressed in a delicate garden-inspired outfit with soft pastel tones, floral details, and a romantic feminine styling, seated in a charming enchanted garden set with abundant flowers, greenery, decorative mushrooms, whimsical props, and a dreamy fairytale atmosphere, with floral arrangements surrounding the scene and soft natural-looking textures, elegant composition, soft diffused studio lighting, and a polished professional baby photoshoot look."
    },
    {
      title: "Infantil Feminino / Circo Rosa",
      category: "Imagem",
      description: "Tema: ensaio infantil feminino de circo em paleta rosa com clima festivo.",
      imageLabel: "Circo Rosa",
      colors: ["#c76f9f", "#f4bfd6"],
      prompt: "Create an image of a vertical studio baby portrait of a baby girl dressed in a pink circus-inspired outfit with playful feminine details, seated in a whimsical circus-themed set featuring pink and white drapery, balloons, decorative circus props, a small circus stand, and festive elements such as stars, banners, and a miniature carousel or circus pedestal, creating a sweet and celebratory atmosphere, clean editorial composition, soft controlled studio lighting, and a polished professional baby photoshoot look."
    },
    {
      title: "Infantil Feminino / Branca de Neve",
      category: "Imagem",
      description: "Tema: ensaio infantil de princesa clássica inspirado em conto de fadas.",
      imageLabel: "Branca Neve",
      colors: ["#516da3", "#e5c45e"],
      prompt: "Create an image of a vertical studio baby portrait of a baby girl dressed in a princess outfit inspired by Snow White, featuring a classic fairytale color palette with elegant royal details, seated in a magical storybook-themed set with decorative apples, floral arrangements, woodland-inspired elements, an ornate chair or pedestal, and subtle fairytale props, creating a charming and enchanting princess atmosphere, elegant composition, soft diffused studio lighting, and a polished professional baby photoshoot look."
    },
    {
      title: "Infantil Feminino / Jardim de Borboletas",
      category: "Imagem",
      description: "Tema: ensaio infantil delicado com borboletas, flores e leveza visual.",
      imageLabel: "Borboletas",
      colors: ["#8a7ac2", "#d7c9f4"],
      prompt: "Create an image of a vertical studio baby portrait of a baby girl dressed in a delicate outfit with soft pastel colors and butterfly-inspired details, seated in a dreamy butterfly garden set with flowers, greenery, decorative butterflies, soft floral textures, and whimsical nature-inspired props surrounding the scene, creating a light, feminine, and magical atmosphere, clean editorial composition, soft diffused studio lighting, and a polished professional baby photoshoot look."
    },
    {
      title: "Infantil Feminino / Princesa",
      category: "Imagem",
      description: "Tema: ensaio infantil real com trono, coroa e estética clássica.",
      imageLabel: "Princesa",
      colors: ["#9b7ab8", "#e5d2f1"],
      prompt: "Create an image of a vertical studio baby portrait of a baby girl dressed in an elegant princess gown with soft luxurious fabric, refined royal details, and a delicate crown or tiara, seated in a classic princess-themed set with an ornate throne or decorative chair, floral arrangements, soft drapery, and subtle castle-inspired decorative elements, creating a regal and dreamy fairytale atmosphere, elegant composition, soft studio lighting, and a polished professional baby photoshoot look."
    },
    {
      title: "Infantil Feminino / Magali",
      category: "Imagem",
      description: "Tema: ensaio infantil alegre com melancias e universo lúdico.",
      imageLabel: "Magali",
      colors: ["#67a64a", "#f06e79"],
      prompt: "Create an image of a vertical studio baby portrait of a baby girl dressed in a playful outfit inspired by Magali, featuring cheerful colors and a fun cartoon-like styling, seated in a bright and joyful set with watermelons, picnic-style props, playful decorative elements, balloons, and a colorful whimsical atmosphere inspired by the character's universe, creating a sweet and lively scene, clean editorial composition, soft diffused studio lighting, and a polished professional baby photoshoot look."
    },
    {
      title: "Infantil Feminino / Sereia",
      category: "Imagem",
      description: "Tema: ensaio infantil submarino com brilho perolado e fantasia oceânica.",
      imageLabel: "Sereia",
      colors: ["#4a8ea7", "#8fd8d6"],
      prompt: "Create an image of a vertical studio baby portrait of a baby girl dressed in a mermaid-inspired outfit with shimmering fabric, seashell details, and ocean-inspired colors, seated in an under-the-sea themed set with shells, pearls, coral, starfish, soft iridescent textures, and aquatic decorative elements, creating a magical underwater fantasy atmosphere, elegant composition, soft glowing studio lighting, and a polished professional baby photoshoot look."
    },
    // Ensaios infantis - masculino
    {
      title: "Infantil Masculino / Safári",
      category: "Imagem",
      description: "Tema: ensaio infantil de aventura com selva, animais e tons terrosos.",
      imageLabel: "Safari",
      colors: ["#6f7b4a", "#c8b88a"],
      prompt: "Create an image of a vertical studio baby portrait of a baby boy dressed in a safari-inspired outfit with earthy tones and adventurous styling, seated in a themed set with jungle leaves, wooden props, plush safari animals, crates, binoculars, and natural textures, creating a playful safari adventure atmosphere, with clean composition, soft diffused studio lighting, and a polished professional baby photoshoot look."
    },
    {
      title: "Infantil Masculino / Mundo Bita",
      category: "Imagem",
      description: "Tema: ensaio infantil colorido com referências lúdicas do Mundo Bita.",
      imageLabel: "Mundo Bita",
      colors: ["#3d7bc7", "#f4c74e"],
      prompt: "Create an image of a vertical studio baby portrait of a baby boy dressed in a colorful outfit inspired by Mundo Bita, seated in a cheerful themed set with bright balloons, clouds, stars, playful educational elements, and colorful decorative props inspired by the joyful world of the character, creating a fun and vibrant celebratory atmosphere, clean editorial composition, soft studio lighting, and a polished professional baby photoshoot look."
    },
    {
      title: "Infantil Masculino / Fazendinha",
      category: "Imagem",
      description: "Tema: ensaio infantil campestre com fardos de feno e clima acolhedor.",
      imageLabel: "Fazendinha",
      colors: ["#8a6a42", "#e6c887"],
      prompt: "Create an image of a vertical studio baby portrait of a baby boy dressed in a farm-inspired outfit with rustic details and country styling, seated in a charming farm-themed set with hay bales, wooden fences, small crates, sunflowers, toy farm animals, and rustic decorative props, creating a warm and playful countryside atmosphere, clean composition, soft diffused studio lighting, and a polished professional baby photoshoot look."
    },
    {
      title: "Infantil Masculino / Bolofofos",
      category: "Imagem",
      description: "Tema: ensaio infantil fofo em tons pastel com estética de desenho.",
      imageLabel: "Bolofofos",
      colors: ["#7da3e8", "#f4b7cf"],
      prompt: "Create an image of a vertical studio baby portrait of a baby boy dressed in a cute colorful outfit inspired by Bolofofos, seated in a playful themed set with soft pastel colors, balloons, clouds, stars, and cheerful cartoon-inspired decorative elements, creating a fun, sweet, and child-friendly atmosphere, clean editorial composition, soft controlled studio lighting, and a polished professional baby photoshoot look."
    },
    {
      title: "Infantil Masculino / Poderoso Chefinho",
      category: "Imagem",
      description: "Tema: ensaio infantil divertido com estilo executivo em miniatura.",
      imageLabel: "Boss Baby",
      colors: ["#4f6d9e", "#d9e2f2"],
      prompt: "Create an image of a vertical studio baby portrait of a baby boy dressed in a formal outfit inspired by Boss Baby, featuring a tailored suit, tie, and polished miniature executive styling, seated in a playful corporate-themed set with a small desk, briefcase, papers, balloons, and subtle office-inspired props, creating a humorous and stylish atmosphere, clean editorial composition, soft studio lighting, and a polished professional baby photoshoot look."
    },
    {
      title: "Infantil Masculino / Mickey",
      category: "Imagem",
      description: "Tema: ensaio infantil clássico com paleta icônica e clima divertido.",
      imageLabel: "Mickey",
      colors: ["#30343b", "#e75845"],
      prompt: "Create an image of a vertical studio baby portrait of a baby boy dressed in an outfit inspired by Mickey Mouse, featuring classic red, black, yellow, and white styling, seated in a cheerful themed set with balloons, stars, playful decorative props, and subtle amusement-park-inspired elements, creating a fun and timeless cartoon atmosphere, clean composition, soft diffused studio lighting, and a polished professional baby photoshoot look."
    },
    {
      title: "Infantil Masculino / Circo",
      category: "Imagem",
      description: "Tema: ensaio infantil circense com cores clássicas e energia festiva.",
      imageLabel: "Circo Masculino",
      colors: ["#3c5fa5", "#d8525b"],
      prompt: "Create an image of a vertical studio baby portrait of a baby boy dressed in a circus-inspired outfit with festive playful details, seated in a whimsical circus-themed set featuring classic red, blue, and white drapery, balloons, decorative circus props, stars, banners, and a celebratory carnival atmosphere, creating a fun and lively scene, clean editorial composition, soft controlled studio lighting, and a polished professional baby photoshoot look."
    },
    {
      title: "Infantil Masculino / Pequeno Príncipe",
      category: "Imagem",
      description: "Tema: ensaio infantil poético com estrelas e elementos celestiais.",
      imageLabel: "Peq Principe",
      colors: ["#5067a4", "#f0cf73"],
      prompt: "Create an image of a vertical studio baby portrait of a baby boy dressed in an outfit inspired by The Little Prince, featuring elegant storybook styling and delicate royal details, seated in a dreamy themed set with stars, moons, clouds, a small planet-inspired prop, and whimsical celestial elements, creating a poetic and magical atmosphere, elegant composition, soft glowing studio lighting, and a polished professional baby photoshoot look."
    },
    {
      title: "Infantil Masculino / Toy Story",
      category: "Imagem",
      description: "Tema: ensaio infantil aventureiro com brinquedos e universo animado.",
      imageLabel: "Toy Story",
      colors: ["#4f84d9", "#f3c650"],
      prompt: "Create an image of a vertical studio baby portrait of a baby boy dressed in an outfit inspired by Toy Story, featuring playful character-inspired colors and child-friendly styling, seated in a themed set with clouds, stars, toy blocks, cowboy-inspired decorative props, and colorful playful elements inspired by the animated universe, creating a fun and adventurous atmosphere, clean editorial composition, soft studio lighting, and a polished professional baby photoshoot look."
    }
  ];
  const elements = {
    searchInput: document.querySelector("#promptSearch"),
    filterGroup: document.querySelector("#promptFilters"),
    grid: document.querySelector("#promptGrid"),
    count: document.querySelector("#promptCount"),
    emptyState: document.querySelector("#emptyState")
  };

  if (!elements.searchInput || !elements.filterGroup || !elements.grid || !elements.count || !elements.emptyState) {
    return;
  }

  let activeFilter = "Todos";
  let searchTerm = "";

  const normalizeText = (value) =>
    value
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .toLowerCase();

  const filterOrder = ["Todos", "Formatura", "Camera", "Pose", "Ensaio", "Infantil", "Adolescente", "Adulto", "Feminino", "Masculino"];
  const filterLabels = {
    Todos: "Todos",
    Formatura: "Formatura",
    Camera: "Câmera",
    Pose: "Pose",
    Ensaio: "Ensaio",
    Infantil: "Infantil",
    Adolescente: "Adolescente",
    Adulto: "Adulto",
    Feminino: "Feminino",
    Masculino: "Masculino"
  };

  const inferPromptTags = (item) => {
    const source = normalizeText(`${item.title} ${item.description}`);
    const sourceTokens = ` ${source.replace(/[^a-z0-9]+/g, " ")} `;
    const tags = new Set();
    const has = (value) => {
      const token = normalizeText(value).replace(/[^a-z0-9]+/g, " ").trim();
      if (!token) {
        return false;
      }

      return sourceTokens.includes(` ${token} `);
    };

    if (item.category === "Camera") {
      tags.add("Camera");
    }

    if (item.category === "Personagem" || has("pose")) {
      tags.add("Pose");
    }

    if (has("formatura")) {
      tags.add("Formatura");
      tags.add("Ensaio");
    }

    if (has("infantil") || has("baby") || has("child")) {
      tags.add("Infantil");
    }

    if (has("adolescente")) {
      tags.add("Adolescente");
    }

    if (has("adulto")) {
      tags.add("Adulto");
    }

    if (has("menina") || has("girl") || has("mulher") || has("woman") || has("feminino") || has("feminina")) {
      tags.add("Feminino");
    }

    if (has("menino") || has("boy") || has("homem") || has("man") || has("masculino") || has("masculina")) {
      tags.add("Masculino");
    }

    if (!tags.has("Pose") && !tags.has("Camera")) {
      tags.add("Ensaio");
    }

    // Fallback para ensaios sem marcação explícita de gênero.
    if (!tags.has("Pose") && !tags.has("Camera") && !tags.has("Masculino") && !tags.has("Feminino")) {
      tags.add("Feminino");
    }

    return Array.from(tags);
  };

  const getCardTagLabel = (item) => {
    if (item.tags.includes("Formatura")) {
      if (item.tags.includes("Infantil") && item.tags.includes("Feminino")) {
        return "Formatura • Infantil • Feminino";
      }

      if (item.tags.includes("Infantil") && item.tags.includes("Masculino")) {
        return "Formatura • Infantil • Masculino";
      }

      if (item.tags.includes("Adolescente") && item.tags.includes("Feminino")) {
        return "Formatura • Adolescente • Feminino";
      }

      if (item.tags.includes("Adolescente") && item.tags.includes("Masculino")) {
        return "Formatura • Adolescente • Masculino";
      }

      if (item.tags.includes("Adulto") && item.tags.includes("Feminino")) {
        return "Formatura • Adulto • Feminino";
      }

      if (item.tags.includes("Adulto") && item.tags.includes("Masculino")) {
        return "Formatura • Adulto • Masculino";
      }

      return "Formatura";
    }

    if (item.tags.includes("Camera") && item.tags.includes("Infantil") && item.tags.includes("Feminino")) {
      return "Câmera • Infantil • Feminino";
    }

    if (item.tags.includes("Camera") && item.tags.includes("Infantil") && item.tags.includes("Masculino")) {
      return "Câmera • Infantil • Masculino";
    }

    if (item.tags.includes("Camera") && item.tags.includes("Infantil")) {
      return "Câmera • Infantil";
    }

    if (item.tags.includes("Camera")) {
      return "Câmera";
    }

    if (item.tags.includes("Pose")) {
      return "Pose";
    }

    if (item.tags.includes("Infantil") && item.tags.includes("Feminino")) {
      return "Infantil • Feminino";
    }

    if (item.tags.includes("Infantil") && item.tags.includes("Masculino")) {
      return "Infantil • Masculino";
    }

    if (item.tags.includes("Ensaio") && item.tags.includes("Feminino")) {
      return "Ensaio • Feminino";
    }

    if (item.tags.includes("Ensaio") && item.tags.includes("Masculino")) {
      return "Ensaio • Masculino";
    }

    return item.category;
  };

  const promptsCatalog = prompts.map((item) => ({
    ...item,
    tags: inferPromptTags(item)
  }));

  const promptImageExtensions = [".webp"];

  const buildReferenceImageCandidates = (title) => {
    const baseTitle = title.trim();
    const candidateStems = Array.from(
      new Set([
        baseTitle,
        baseTitle.replace(/\s*\/\s*/g, "  "),
        baseTitle.replace(/\s*\/\s*/g, " - "),
        baseTitle.replace(/\s*\/\s*/g, " ")
      ])
    );

    return candidateStems.flatMap((stem) =>
      promptImageExtensions.map((extension) => encodeURI(`./assets/images/Prompts/${stem}${extension}`))
    );
  };

  const setReferenceImage = (image, item, placeholderSrc) => {
    const candidates = buildReferenceImageCandidates(item.title);
    if (!candidates.length) {
      image.src = placeholderSrc;
      return;
    }

    let candidateIndex = 0;
    const cleanup = () => {
      image.removeEventListener("error", handleError);
    };

    const handleError = () => {
      if (candidateIndex < candidates.length) {
        image.src = candidates[candidateIndex];
        candidateIndex += 1;
        return;
      }

      cleanup();
      image.src = placeholderSrc;
    };

    image.addEventListener("error", handleError);
    image.addEventListener("load", cleanup, { once: true });
    handleError();
  };

  const buildFilterButtons = () => {
    const availableFilters = filterOrder.filter(
      (filter) => filter === "Todos" || promptsCatalog.some((item) => item.tags.includes(filter))
    );

    const getFilterCount = (filter) =>
      filter === "Todos"
        ? promptsCatalog.length
        : promptsCatalog.filter((item) => item.tags.includes(filter)).length;

    elements.filterGroup.replaceChildren(
      ...availableFilters.map((filter, index) => {
        const count = getFilterCount(filter);
        const label = filterLabels[filter] || filter;
        const button = document.createElement("button");
        button.type = "button";
        button.className = `prompt-filter${index === 0 ? " is-active" : ""}`;
        button.dataset.filter = filter;
        button.textContent = `${label} (${count})`;
        button.setAttribute("aria-label", `${label}: ${count} prompts`);
        button.title = `${count} prompt${count === 1 ? "" : "s"}`;
        return button;
      })
    );
  };

  const buildPlaceholder = (label, colorStart, colorEnd) => {
    const svg = `
      <svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 1200 675' role='img' aria-label='Placeholder'>
        <defs>
          <linearGradient id='g' x1='0%' y1='0%' x2='100%' y2='100%'>
            <stop offset='0%' stop-color='${colorStart}' />
            <stop offset='100%' stop-color='${colorEnd}' />
          </linearGradient>
        </defs>
        <rect width='1200' height='675' fill='url(#g)' />
        <circle cx='190' cy='540' r='180' fill='rgba(255,255,255,0.10)' />
        <circle cx='980' cy='110' r='170' fill='rgba(255,255,255,0.16)' />
        <text x='72' y='110' fill='rgba(255,255,255,0.88)' font-family='Arial, sans-serif' font-size='36' font-weight='700'>Biblioteca de Prompts</text>
        <text x='72' y='160' fill='rgba(255,255,255,0.82)' font-family='Arial, sans-serif' font-size='28'>${label}</text>
      </svg>
    `;

    return `data:image/svg+xml;charset=UTF-8,${encodeURIComponent(svg)}`;
  };

  const copyWithFallback = async (text) => {
    // Fluxo principal de cópia com Clipboard API.
    if (navigator.clipboard && window.isSecureContext) {
      try {
        await navigator.clipboard.writeText(text);
        return true;
      } catch {
        // continua no fallback
      }
    }

    const textarea = document.createElement("textarea");
    textarea.value = text;
    textarea.setAttribute("readonly", "");
    textarea.style.position = "fixed";
    textarea.style.opacity = "0";
    textarea.style.pointerEvents = "none";
    document.body.appendChild(textarea);
    textarea.select();

    let copied = false;
    try {
      copied = document.execCommand("copy");
    } catch {
      copied = false;
    }

    document.body.removeChild(textarea);
    return copied;
  };

  const showCopyFeedback = (button, feedback, success) => {
    const defaultText = "Copiar Prompt";
    const copiedText = success ? "Copiado!" : "Falha ao copiar";
    const feedbackText = success ? "Prompt copiado!" : "Não foi possível copiar automaticamente.";

    button.textContent = copiedText;
    button.classList.toggle("is-copied", success);
    feedback.textContent = feedbackText;

    if (button.copyTimeoutId) {
      window.clearTimeout(button.copyTimeoutId);
    }

    button.copyTimeoutId = window.setTimeout(() => {
      button.textContent = defaultText;
      button.classList.remove("is-copied");
      feedback.textContent = "";
      button.copyTimeoutId = null;
    }, 1700);
  };

  const createCard = (item) => {
    const card = document.createElement("article");
    card.className = "prompt-card";

    const figure = document.createElement("figure");
    figure.className = "prompt-card-image-wrap";

    const image = document.createElement("img");
    image.className = "prompt-card-image";
    image.loading = "lazy";
    image.decoding = "async";
    image.fetchPriority = "low";
    image.width = 1000;
    image.height = 1000;
    const placeholderSrc = buildPlaceholder(item.imageLabel, item.colors[0], item.colors[1]);
    setReferenceImage(image, item, placeholderSrc);
    image.alt = `Imagem de referência para ${item.title}`;

    figure.appendChild(image);

    const top = document.createElement("div");
    top.className = "prompt-card-top";

    const title = document.createElement("h2");
    title.className = "prompt-card-title";
    title.textContent = item.title;

    const tag = document.createElement("span");
    tag.className = "prompt-card-tag";
    tag.textContent = getCardTagLabel(item);

    top.appendChild(title);
    top.appendChild(tag);

    const description = document.createElement("p");
    description.className = "prompt-card-description";
    description.textContent = item.description;

    const prompt = document.createElement("pre");
    prompt.className = "prompt-card-prompt";
    prompt.textContent = item.prompt;

    const actions = document.createElement("div");
    actions.className = "prompt-card-actions";

    const copyButton = document.createElement("button");
    copyButton.type = "button";
    copyButton.className = "prompt-copy-btn";
    copyButton.textContent = "Copiar Prompt";

    const feedback = document.createElement("p");
    feedback.className = "prompt-copy-feedback";
    feedback.setAttribute("aria-live", "polite");

    copyButton.addEventListener("click", async () => {
      const copied = await copyWithFallback(item.prompt);
      showCopyFeedback(copyButton, feedback, copied);
    });

    actions.appendChild(copyButton);
    actions.appendChild(feedback);

    card.appendChild(figure);
    card.appendChild(top);
    card.appendChild(description);
    card.appendChild(prompt);
    card.appendChild(actions);

    return card;
  };

  const render = () => {
    // Busca por título, tema, descrição e conteúdo completo do prompt.
    const term = normalizeText(searchTerm.trim());

    const filtered = promptsCatalog.filter((item) => {
      const filterMatch = activeFilter === "Todos" || item.tags.includes(activeFilter);
      if (!filterMatch) {
        return false;
      }

      if (!term) {
        return true;
      }

      const searchable = normalizeText(`${item.title} ${item.category} ${item.tags.join(" ")} ${item.description} ${item.prompt}`);
      return searchable.includes(term);
    });

    elements.grid.replaceChildren(...filtered.map(createCard));
    elements.count.textContent = `${filtered.length} prompt${filtered.length === 1 ? "" : "s"} encontrado${filtered.length === 1 ? "" : "s"}`;
    elements.emptyState.hidden = filtered.length !== 0;
  };

  elements.searchInput.addEventListener("input", (event) => {
    searchTerm = event.target.value;
    render();
  });

  elements.filterGroup.addEventListener("click", (event) => {
    const target = event.target;
    if (!(target instanceof HTMLButtonElement)) {
      return;
    }

    const filter = target.dataset.filter;
    if (!filter || filter === activeFilter) {
      return;
    }

    activeFilter = filter;

    elements.filterGroup
      .querySelectorAll(".prompt-filter")
      .forEach((button) => button.classList.toggle("is-active", button === target));

    render();
  });

  buildFilterButtons();
  render();
})();



